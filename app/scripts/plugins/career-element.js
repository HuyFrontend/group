/**
 *  @name plugin
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
  'use strict';

  var pluginName = 'CareerElement';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this, elm = that.element, opt = that.options;

      opt.elementApply = opt.elementApply ? opt.elementApply : $('[' + opt.dataApply + ']');
      opt.elementDetail = opt.elementDetail ? opt.elementDetail : $('[' + opt.dataDetail + ']');

      elm.off('click.showApplyForm').on('click.showApplyForm', '[' + opt.dataItem + ']', function () {
        if(!opt.ajaxOneTime) {
          var url = $('#list_career').attr('data-url');
          showApplyForm(url, getSuccess, opt.elementDetail, opt.elementApply, this);
          opt.ajaxOneTime = 1;
          $('.' + opt.classIconLoading).removeClass(opt.classHidden);
        }
      });

      elm.off('click.back.' + pluginName).on('click.back.' + pluginName, '[' + opt.dataBack + ']', function () {
        // changeShowHide(opt.elementDetail, opt.elementApply);

        opt.elementApply.fadeIn(200, function () {
        });

        opt.elementDetail.fadeOut(200, function () {
          opt.elementApply.removeClass(opt.classHidden);
          opt.elementDetail.addClass(opt.classHidden);
          opt.elementDetail.removeClass(opt.classNoPosition);
          opt.elementApply.parent().css({
            'min-height': 0
          });

          var careerTitlel = $('#career .grid-fluid').offset().top;
          var header = $('.header').height();

          $('body,html').animate({
            scrollTop: careerTitlel - header
          }, 'slow');
          opt.ajaxOneTime = 0;
        });
      });

      var showApplyForm = function (url, calbackSuccess, elementHidding, elementShowing, listObject) {
        $.ajax ({
          type: 'post',
          data:{action:'detail_career',careerID:$(listObject).find('a').attr('data-career-id'), langCode:$(listObject).find('a').attr('data-career-lang')},
          url: url,
          success: function (res) {
            if(calbackSuccess) {
              calbackSuccess(res, elementHidding, elementShowing);
            }
          }
        });
      };

      var getSuccess = function (data, elementHidding , elementShowing) {
        $('.' + opt.classIconLoading).addClass(opt.classHidden);
        if(data) {
          elementHidding.html(data);

          changeShowHide(elementHidding,elementShowing);

          elementHidding.find('form')['validate-form']();
        }
      };

      var changeShowHide = function (hidding, showing) {

        showing.fadeOut(200, function () {

        });

        hidding.fadeIn(200, function () {
          showing.addClass(opt.classHidden);
          hidding.removeClass(opt.classHidden);
          hidding.addClass(opt.classNoPosition);
          hidding.parent().css({
            'min-height': hidding.height()
          });
          var careerTitlel = $('#career .grid-fluid').offset().top;
          var header = $('.header').height();
          hidding.find('form')['validate-form']();
          $('body,html').animate({
            scrollTop: careerTitlel - header
          }, 'slow');

          opt.ajaxOneTime = 0;
        });
      };
    },
    destroy: function() {
      // remove events
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
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    onCallback: null,
    classActive: 'active',
    classHidden: 'hide',
    classDisabled: 'disabled',
    classNoPosition: 'no-position',
    classIconLoading: 'ajax-overlay',
    dataItem: 'data-item',
    dataApply:'data-apply',
    dataDetail: 'data-detail',
    dataBack: 'data-return',
    dataTarget: 'data-target',
    elementApply : '',
    elementDetail: '',
    ajaxOneTime: 0
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    // $('[data-' + pluginName + ']')[pluginName]();
    $('[data-toggle="CareerElement"]')[pluginName]();
  });

}(jQuery, window));
