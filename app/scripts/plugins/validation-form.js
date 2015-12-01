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

        opt.validType = opt.validType ? opt.validType : elm.attr('data-type-valid');
        opt.typeRemoveHolder = elm.attr('data-remove-holder') ? elm.attr('data-remove-holder') : opt.typeRemoveHolder;

        if(opt.validType && ( opt.validType === 'contact-form')) {
          that.validateForm();
        }
        if(opt.validType && (opt.validType === 'apply-form') ) {
          that.validateFormApply();
        }
        that.createMethod();

        elm.find('#' + opt.idInputFile).on('change', function () {
          if(this.files.length) {
            elm.find('#' + opt.idInputText).val(this.files[0].name);
          }
          else {
            elm.find('#' + opt.idInputText).val('');
          }
        });

        body.off('focus.formField', '[required="required"], #comment, #message').on('focus.formField', '[required="required"], #comment, #message', function () {
          var me = $(this);
          if(( me.closest('[' + opt.dataRemoveHolder+ ']') && me.closest('[' + opt.dataRemoveHolder+ ']').attr(opt.dataRemoveHolder) === 'all' ) || document.documentElement.clientWidth < 768) {
            me.prev().addClass(opt.classHidden);
            me.closest('.' + opt.classFormGroup).find('[' + opt.dataHolder + ']').addClass(opt.classHidden);
          }
        });

        body.off('blur.formField', '[required="required"], #comment, #message').on('blur.formField', '[required="required"], #comment, #message', function () {
          var me = $(this);
          if(!me.val()) {
            if(( me.closest('[' + opt.dataRemoveHolder+ ']') && me.closest('[' + opt.dataRemoveHolder+ ']').attr(opt.dataRemoveHolder) === 'all' ) || document.documentElement.clientWidth < 768) {
              me.prev().removeClass(opt.classHidden);
              me.closest('.' + opt.classFormGroup).find('[' + opt.dataHolder + ']').removeClass(opt.classHidden);
            }
          }
        });

        body.off('click.holderElement', '[data-holder]').on('click.holderElement', '[data-holder]', function () {
          var me = $(this);
          if(( me.closest('[' + opt.dataRemoveHolder+ ']') && me.closest('[' + opt.dataRemoveHolder+ ']').attr(opt.dataRemoveHolder) === 'all' ) || document.documentElement.clientWidth < 768) {
            me.addClass(opt.classHidden);
            me.next().focus();
            me.closest('.' + opt.classFormGroup).find('input').focus();
            me.closest('.' + opt.classFormGroup).find('textarea').focus();
          }
        });

        body.off('click.offPopup touchstart.offPopup', '[' + opt.dataPopup + ']').on('click.offPopup touchstart.offPopup', '[' + opt.dataPopup + ']', function (e) {
          var target = $(e.target);
          var content = target.hasClass(opt.classContentPopup) ? target : '';
          var child =  target.closest('.' + opt.classContentPopup).length ? target.closest('.' + opt.classContentPopup) : '';
          if(!content && ! child) {
            $(this).addClass(opt.classHidden);
          }
        });

        body.off('click.offPopup touchstart.offPopup', '[' + opt.dataPopup + ']' + ' a.close').on('click.offPopup touchstart.offPopup', '[' + opt.dataPopup + ']' + ' a.close', function () {
          $(this).closest('[' + opt.dataPopup + ']').addClass(opt.classHidden);
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
          var serialize = $(form).serialize();

          form.find('[required="required"]').attr('disabled', true);
          form.find('[type="submit"]').attr('disabled', true);
          textSubmit.html(L10n[lang].text.sending);
          //real ajax
          $.ajax({
              method: 'post',
              dataType: 'json',
              url: url,
              data: serialize,
              success: function (res) {
                var message;
                var errorCode = (res.code) ? res.code : 0;
                var popup =  $('[' + opt.dataPopup + ']');
                message = L10n[lang].ajax.contact.code[parseInt(errorCode) - 1];
                elm.removeClass(opt.classHidden);

                popup.find('p').html(message);
                popup.parent().removeClass(opt.classHidden);
                popup.removeClass(opt.classHidden);

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
            if(errorElement && errorElement.length) {
              errorElement.html(firstErrorMessage);
              errorElement.removeClass(opt.classHidden);
            }
            else {
              var errorString = '<span class="error-message hide">Please enter your first name</span>';
              $(errorString).insertAfter(firstErrorElement);
              errorElement = thisGroup.find(opt.errorNoticeElement);
              errorElement.html(firstErrorMessage);
              errorElement.removeClass(opt.classHidden);
            }

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
              required: L10n[lang].required.firstName
            },
            'lastname': {
              required: L10n[lang].required.lastName
            },
            'email': {
              required: L10n[lang].required.email,
              validEmail: L10n[lang].invalid.email
            },
            'file': {
              required: L10n[lang].required.fileUpload
            },
            'security': {
              required: L10n[lang].required.code
            }
        };
        var ajaxSubmit = function (form, calback) {
          form = $(form);
          var textSubmit = form.find('[type="submit"] span');

          var m_data = new FormData();
              m_data.append( 'username', $('input[name=username]').val());
              m_data.append( 'lastname', $('input[name=lastname]').val());
              m_data.append( 'email', $('input[name=email]').val());
              m_data.append( 'comment', $('textarea[name=comment]').val());
              m_data.append( 'action', $('input[name=action]').val());
              m_data.append( 'ic_form_token', $('input[name=ic_form_token]').val());
              m_data.append( 'security', $('input[name=security]').val());
              m_data.append( 'file_attach', $('input[name=file]')[0].files[0]);

          form.find('[required="required"]').attr('disabled', true);
          form.find('[type="submit"]').attr('disabled', true);
          textSubmit.html(L10n[lang].text.sending);

          $.ajax({
              method: 'post',
              dataType: 'json',
              url: form.attr('action'),
              data: m_data,
              processData: false,
              contentType: false,
              enctype: 'multipart/form-data',
              success: function (res) {
                var message;
                var errorCode = (res.code) ? res.code : 0;
                var popup =  $('[' + opt.dataPopup + ']');
                message = L10n[lang].ajax.contact.code[parseInt(errorCode) - 1];
                elm.removeClass(opt.classHidden);

                popup.find('p').html(message);
                popup.parent().removeClass(opt.classHidden);
                popup.removeClass(opt.classHidden);

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

            if(errorElement && errorElement.length) {
              errorElement.html(firstErrorMessage);
              errorElement.removeClass(opt.classHidden);
            }
            else {
              var errorString = '<span class="error-message hide">This field is required</span>';
              $(errorString).insertAfter(firstErrorElement);
              errorElement = thisGroup.find(opt.errorNoticeElement);
              errorElement.html(firstErrorMessage);
              errorElement.removeClass(opt.classHidden);
            }

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
      classErrorGroup: 'has-error',
      classError: 'error-message',
      classFormGroup: 'form-group',
      classHidden: 'hide',
      classLoadingIcon: 'loading',
      classContentPopup: 'message-layer',
      classReset: 'reset',
      errorNoticeElement: 'span.error-message',
      dataHolder: 'data-holder',
      dataPopup: 'data-popup-valid-form',
      dataRemoveHolder: 'data-remove-holder',
      elementOverlay: 'sm-overlay',
      elementLoading: '',
      validType: '',
      idInputText: 'upload',
      idInputFile: 'file',
      typeRemoveHolder: '',
      isMobile: navigator.userAgent.match(/Android|BlackBerry|BB|iPhone|iPad|iPod|Opera Mini|IEMobile/i),
      screenWidth: document.documentElement.clientWidth

    };

    $(function() {
      $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));
