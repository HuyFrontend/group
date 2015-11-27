/**
   *  @name validate-form
   *  @description description
   *  @version 1.0
   *  @options
   *    option
   *  @events
   *    event
   *  @methods
   *    init
   *    publicMethod
   *    destroy
   */
  ;(function($, window, undefined) {
    var pluginName = 'validate-form',
        L10n = window.L10n,
        lang = $('html').attr('lang');

    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, options);
      this.init();
    }

    Plugin.prototype = {
      init: function() {
        var that = this,
            elm = that.element,
            opt = that.options;
        var body = elm.closest('body');

        that.createMethod();
        that.validateForm();

        body.off('focus.formField', '[required="required"]').on('focus.formField', '[required="required"]', function () {
          var me = $(this);
          me.prev().addClass(opt.classHidden);
        });
        body.off('blur.formField', '[required="required"]').on('blur.formField', '[required="required"]', function () {
          var me = $(this);
          if(!me.val()) {
            me.prev().removeClass(opt.classHidden);
          }
        });
        body.off('click.holderElement', '[data-holder]').on('click.holderElement', '[data-holder]', function () {
          var me = $(this);
          me.addClass(opt.classHidden);
          me.next().focus();
        });
        body.off('click.offPopup touchstart.offPopup', '.' + opt.elementOverlay).on('click.offPopup touchstart.offPopup', '.' + opt.elementOverlay, function (e) {
          var target = $(e.target);
          var content = target.hasClass(opt.classContentPopup) ? target : '';
          var child =  target.closest('.' + opt.classContentPopup).length ? target.closest('.' + opt.classContentPopup) : '';
          if(!content && ! child) {
            $(this).addClass(opt.classHidden);
          }
        });
        body.off('click.offPopup touchstart.offPopup', '.' + opt.elementOverlay + ' a.close').on('click.offPopup touchstart.offPopup', '.' + opt.elementOverlay + ' a.close', function () {
          $(this).closest('.' + opt.elementOverlay).addClass(opt.classHidden);
        });
        body.off('kepress').on('keypress', 'form input', function(e) {
          var key = e.keyCode || e.which;
          if (key === 13) {
            elm.find('[type="submit"]').click();
            return false;
          }
        });
        // check to show hide holder label
        var holder = elm.find('[data-holder]');
        if(holder) {
          var next = holder.next();
          if(next.val()) {
            holder.addClass(opt.classHidden);
          }
          else {
            holder.removeClass(opt.classHidden);
          }
        }
      },
      validateForm: function () {
        var that = this, elm = that.element, opt = that.options;

        var rules = {
            'username': {
              required: true
            },
            'email': {
              required: true,
              validEmail: true
            },
            'message': {
              required: true,
            },
            'security': {
              required: true
            }
        };

        var messages = {
            'username': {
              required: L10n[lang].required.username
            },
            'email': {
              required: L10n[lang].required.email,
              validEmail: L10n[lang].invalid.email
            },
            'message': {
              required: L10n[lang].required.comment
            },
            'security': {
              required: L10n[lang].required.capcha
            }
        };
        var ajaxSubmit = function (form, calback) {
          form = $(form);
          var textSubmit = form.find('[type="submit"] span');
          var url = form.attr('action');
          var data = {
            'action': 'ajax_contact_form_process',
            'data' : form.serialize(),
            'ic_form_token' : form.find('[name="ic_form_token"]').val()
          };

          form.find('[required="required"]').attr('disabled', true);
          form.find('[type="submit"]').attr('disabled', true);
          textSubmit.html(L10n[lang].text.sending);

          //real ajax
          $.ajax({
              method: 'post',
              dataType: 'json',
              url: url,
              data: data,
              success: function (res) {
                // res: {error: 0/1, code: 1/2..8}
                var isError = (res.error && res.error === 1) ? true : false;
                var message;
                if(isError) {
                  var errorCode = (res.code) ? res.code : 0;
                  message = L10n[lang].ajax.contact.code[parseInt(errorCode) - 1];
                }
                var popup =  $('.' + opt.classContentPopup);
                elm.removeClass(opt.classHidden);

                popup.find('p').html(message);
                popup.parent().removeClass(opt.classHidden);

                form.find('[required="required"]').removeAttr('disabled');
                form.find('[type="submit"]').removeAttr('disabled');

                textSubmit.html(L10n[lang].text.send);
                if(calback && typeof calback === 'function') {
                  calback;
                }
              },
              error: function () {
              }
          });
        };

        elm.validate({
          rules: rules,
          messages: messages,
          invalidHandler: function(event, validator) {
            event.preventDefault();

            elm.find(opt.errorNoticeElement).addClass(opt.classHidden);
            var errorList = validator.errorList,
                firstErrorElement = errorList[0].element,
                firstErrorMessage = errorList[0].message,
                thisGroup = $(firstErrorElement).closest('.' + opt.classFormGroup),
                errorElement = thisGroup.find(opt.errorNoticeElement);

            errorElement.html(firstErrorMessage);
            errorElement.removeClass(opt.classHidden);

            setTimeout(function () {
              errorElement.addClass(opt.classHidden);
            }, 4000);
          },
          errorPlacement: function() {
            return false;
          },
          submitHandler: function (form) {
            ajaxSubmit(form);
          }
        });
      },
      createMethod: function () {

        jQuery.validator.addMethod(
          'validEmail',
          function (value , element) {

            var rex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            return this.optional(element) || rex.test(value);
          },
          L10n[lang].invalid.email
        );
      },
      validateFormApply: function () {
        var that = this, elm = that.element, opt = that.options;

        var rules = {
            'username': {
              required: true
            },
            'lastname': {
              required: true
            },
            'email': {
              required: true,
              validEmail: true
            },
            'file': {
              required: true,
            },
            'security': {
              required: true
            }
        };

        var messages = {
            'username': {
              required: L10n[lang].required.username
            },
            'lastname': {
              required: L10n[lang].required.lastname
            },
            'email': {
              required: L10n[lang].required.email,
              validEmail: L10n[lang].invalid.email
            },
            'file': {
              required: L10n[lang].required.fileUpload
            },
            'security': {
              required: L10n[lang].required.capcha
            }
        };
        var ajaxSubmit = function (form, calback) {
          form = $(form);
          var textSubmit = form.find('[type="submit"] span');
          form.find('[required="required"]').attr('disabled', true);
          form.find('[type="submit"]').attr('disabled', true);
          textSubmit.html(L10n[lang].text.sending);

          $.ajax({
              method: 'post',
              dataType: 'json',
              url: form.attr('action'),
              data: {
                'action': 'ajax_contact_form_process',
                'data' : form.serialize(),
                'ic_form_token' : form.find('[name="ic_form_token"]').val()
              },
              success: function (res) {
                // res: {error: 0/1, code: 1/2..8}
                var isError = (res.error && res.error === 1) ? true : false;
                var message;
                if(isError) {
                  var errorCode = (res.code) ? res.code : 0;
                  message = L10n[lang].ajax.contact.code[parseInt(errorCode) - 1];
                }
                var popup =  $('.' + opt.classContentPopup);
                elm.removeClass(opt.classHidden);

                popup.find('p').html(message);
                popup.parent().removeClass(opt.classHidden);

                form.find('[required="required"]').removeAttr('disabled');
                form.find('[type="submit"]').removeAttr('disabled');

                textSubmit.html(L10n[lang].text.send);
                if(calback && typeof calback === 'function') {
                  calback;
                }
              },
              error: function () {
              }
          });
        };

        elm.validate({
          rules: rules,
          messages: messages,
          invalidHandler: function(event, validator) {
            event.preventDefault();

            elm.find(opt.errorNoticeElement).addClass(opt.classHidden);
            var errorList = validator.errorList,
                firstErrorElement = errorList[0].element,
                firstErrorMessage = errorList[0].message,
                thisGroup = $(firstErrorElement).closest('.' + opt.classFormGroup),
                errorElement = thisGroup.find(opt.errorNoticeElement);

            errorElement.html(firstErrorMessage);
            errorElement.removeClass(opt.classHidden);

            setTimeout(function () {
              errorElement.addClass(opt.classHidden);
            }, 4000);
          },
          errorPlacement: function() {
            return false;
          },
          submitHandler: function (form) {
            ajaxSubmit(form);
          }
        });
      },
      destroy: function() {
        $.removeData(this.element[0], pluginName);
      }
    };

    $.fn[pluginName] = function(options, params) {
      return this.each(function() {
        var instance = $.data(this, pluginName);
        if (!instance) {
          $.data(this, pluginName, new Plugin(this, options));
        } else if (instance[options]) {
          instance[options](params);
        } else {
          window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      });
    };

    $.fn[pluginName].defaults = {
      groupErrorClass: 'has-error',
      errorClass: 'error-message',
      errorNoticeElement: 'span.error-message',
      classFormGroup: 'form-group',
      classHidden: 'hide',
      dataHolder: 'data-holder',
      classLoadingIcon: 'loading',
      classContentPopup: 'message-layer',
      elementOverlay: 'sm-overlay'
    };

    $(function() {
      $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));
