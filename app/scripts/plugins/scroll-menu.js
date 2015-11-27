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

  var pluginName = 'scroll-menu';
  var body = $('body');
  var elements = function () {
    var elements = [];
    var idElements = document.querySelectorAll('#menu-wrapper [data-target]');
    for (var i = 0, len = idElements.length; i < len; i++) {
      var dataTarget = idElements[i].getAttribute('data-target');
      var item = document.getElementById(dataTarget);
      elements.push(item);
    }
    return elements;
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.options.hideAterScroll = this.element.attr('data-hide-on-scroll') ? this.element.attr('data-hide-on-scroll') : this.options.hideAterScroll;
    this.options.scrollWhenHover = this.element.attr('data-scroll-when-holver') ? this.element.attr('data-scroll-when-holver') : this.options.scrollWhenHover;
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this, elm = that.element, opt = that.options;

      elm.off('click.scrollMenu touchstart.scrollMenu').on('click.scrollMenu touchstart.scrollMenu', 'a[data-target]', function (e) {
        var target = $(e.target),
          elementScrollTo = target.attr('data-target') ? $('#' + target.data('target')) : $('#' + target.closest('[data-target]').attr('data-target')),
          headerHeight = $('.header').height();

        elm.find('.'+ opt.classActive).removeClass(opt.classActive);
        target.closest('li').addClass(opt.classActive);

        if(opt.hideAterScroll) {
          $('#' + opt.blockEffect).removeClass(opt.classOpen);
          $('[data-target="'+ opt.blockEffect +'"]').removeClass(opt.classActive);
        }
        if(!window.isMobileTablet) {
          $(window).off('scroll');
        }
        if(elementScrollTo && elementScrollTo.length) {
          setTimeout(function (){
            $('html, body').stop().animate({
              scrollTop: elementScrollTo.offset().top - headerHeight + 8
            }, 500 );
            // $(window).off('scroll');
          },300);
        }
      });

      if((!opt.scrollWhenHover || opt.scrollWhenHover === 'false') && opt.blockEffect) {
        // var headerHeight = $('.header').height(),
        //     subMenuHeight = elm.height(),
        //     winHeight = $(window).height();
        // if(winHeight > (subMenuHeight + headerHeight)) {
          if(!window.isMobileTablet) {
            body
              .off('mouseover.offBodyScroll, mouseenter.offBodyScroll')
              .on('mouseover.offBodyScroll, mouseenter.offBodyScroll', '#' + opt.blockEffect, function () {
                $('body').on('wheel mousewheel', function () {
                  return false;
                });
              });

            body
              .off('mouseout.onBodyScroll, mouseleave.onBodyScroll')
              .on('mouseout.onBodyScroll, mouseleave.onBodyScroll', '#' + opt.blockEffect, function () {
                $('body').off('wheel mousewheel');
              });
          }
        // }

      }
      if(window.isMobileTablet) {
        body.off('touchstart touchmove touchend resize').on('touchstart touchmove touchend resize', function () {
          $(window).off('scroll').on('scroll');
        });
      }
      // active item menu when scroll page
      var elms = elements();
      function getMiddeElement (e, elements) {
        return window.findMiddleElementOfScreenWhenScroll(e, elements);
      }
      function setActiveItemMenu (middleBlock, menu) {
        if(!middleBlock || !menu) {
          return;
        }
        var id = middleBlock.id;
        var targetItem = menu.querySelector('[data-target="' + id+ '"]');
        var activedItems = menu.querySelectorAll('li.active');
        for(var i = 0, len = activedItems.length; i < len; i++) {
          activedItems[i].removeClass(opt.classActive);
        }
        targetItem.parentNode.addClass(opt.classActive);
      }

      function activeMenuWhenResize(e) {
        var middleBlock = getMiddeElement(e, elms);
        var menu = document.getElementById(opt.blockEffect);
        setActiveItemMenu(middleBlock, menu);
      }
      window.removeEventListenerOrDetachEventMultiEvent(activeMenuWhenResize, ['scroll']);
      window.addEventListenerOrAttachEventMultiEvent(activeMenuWhenResize, ['scroll']);
      // resize middle block when resize screen
      var resizeId;
      function activeItemMenu(e) {
        clearTimeout(resizeId);
        var middleBlock = getMiddeElement(e, elms);
        var menu = document.getElementById(opt.blockEffect);
        var setActive = setActiveItemMenu(middleBlock, menu);
        resizeId = setTimeout(setActive, 0);
      }
      window.removeEventListenerOrDetachEventMultiEvent(activeItemMenu, ['resize']);
      window.addEventListenerOrAttachEventMultiEvent(activeItemMenu, ['resize']);

    },
    destroy: function() {
      // remove events
      // deinitialize
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
    classOpen: 'collapse',
    classActive: 'active',
    blockEffect: 'menu-wrapper',
    hideAterScroll: false,
    scrollWhenHover: true
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-toggle="ScrollMenu"]')[pluginName]();
  });

}(jQuery, window));

