
(function(factory){
  window.ToggleMenu = factory();
})(function(){

  // ToggleMenu DEFINITION
  // ===================
  var ToggleMenu = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};
    this.init();
  };

  // ToggleMenu METHODS
  // ================
  ToggleMenu.prototype = {

    init : function() {
      var self = this, elm = self.element, opt = self.options, body = document.querySelector('body');
      opt.targetElm =  opt.targetId ? document.querySelector('#' + this.options.targetId) : opt.targetElm;
      opt.menuHeight = opt.targetElm ? opt.targetElm.offsetHeight : opt.menuHeight;

      this.actions();
      // this.getWidth();

      elm.removeEventListenerOrDetachEventMultiEvent(self.toggle, ['click']);
      elm.addEventListenerOrAttachEventMultiEvent(self.toggle, ['click']);

      body.removeEventListenerOrDetachEventMultiEvent(self.bodyToggle, ['click']);
      body.addEventListenerOrAttachEventMultiEvent(self.bodyToggle, ['click'] );

      var resizeId;
      function setResize () {
        self.setHeight();
        // self.getWidth();

      }
      function handleResize () {
        clearTimeout(resizeId);
        resizeId = setTimeout(setResize, 0);
      }
      window.removeEventListenerOrDetachEventMultiEvent(handleResize, ['resize']);
      window.addEventListenerOrAttachEventMultiEvent(handleResize, ['resize']);

    },
    actions : function() {
      var self = this, elm = self.element, opt = self.options, body = document.querySelector('body');
      self.toggle = function () {
        if(elm.classList) {
          if(elm.classList.contains(opt.classActive)) {
            elm.classList.remove(opt.classActive);
          }
          else {
            elm.classList.add(opt.classActive);
          }
        }
        else {
          if(elm.hasClass(opt.classActive)) {
            elm.removeClass(opt.classActive);
          }
          else {
            elm.addClass(opt.classActive);
          }
        }

        if(opt.targetElm.classList) {
          if(opt.targetElm.classList.contains(opt.classOpen)) {
            opt.targetElm.classList.remove(opt.classOpen);
            if(window.isMobileTablet) {
              document.body.style.overflow = 'auto';
              body.removeEventListenerOrDetachEventMultiEvent(self.bodyToggle, ['touchstart']);
            }
          }
          else {
            opt.targetElm.classList.add(opt.classOpen);
            self.setHeight();
            if(window.isMobileTablet ) {
              document.body.style.overflow = 'hidden';
              body.addEventListenerOrAttachEventMultiEvent(self.bodyToggle, ['touchstart']);
            }
          }
        }
        else {
          if(opt.targetElm.hasClass(opt.classOpen)) {
            opt.targetElm.removeClass(opt.classOpen);
            if(window.isMobileTablet) {
              document.body.style.overflow = 'auto';
              opt.targetElm.style.overflow = 'auto';
            }
          }
          else {
            self.setHeight();
            opt.targetElm.addClass(opt.classOpen);
             if(window.isMobileTablet) {
              opt.targetElm.style.overflow = 'auto';
              document.body.style.overflow = 'hidden';
            }
          }
        }
      };
      self.setHeight = function () {
        var screenHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : window.innerHeight;
        var headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;

        if((opt.menuHeight + headerHeight) > screenHeight) {
          opt.targetElm.style.maxHeight = ( screenHeight - headerHeight + 8 ) + 'px';
          opt.targetElm.style.overflow = 'auto';
        }
        else {
          if(element.style.removeProperty) {
            opt.targetElm.style.removeProperty('max-height');
            opt.targetElm.style.removeProperty('overflow');
          }
          else {
            opt.targetElm.style.maxHeight = opt.menuHeight + 'px';
            opt.targetElm.style.overflow = 'hidden';
          }
        }
      };
      self.bodyToggle = function (e) {
        var thisTarget = e.target || e.srcElement,
        isBtnMenu = ( thisTarget.hasAttribute('data-toggle') && (thisTarget.getAttribute('data-toggle') === 'ToggleMenu' )) ? thisTarget : '',
        isChildBntMenu = ( thisTarget.parentNode.hasAttribute('data-toggle') && (thisTarget.parentNode.getAttribute('data-toggle') === 'ToggleMenu' )) ? thisTarget.parentNode : '';
        if(!isBtnMenu && !isChildBntMenu) {

          // inner submtenu
          if(thisTarget.closestId(opt.targetId) || thisTarget.id === opt.targetId ) {
            if(window.isMobileTablet) {
              document.body.style.overflow = 'hidden';
              opt.targetElm.style.overflow = 'auto';
            }
          }
          else {
            if(window.isMobileTablet) {
              document.body.style.overflow = 'auto';
            }
            if(elm.classList) {
              if(elm.classList.contains(opt.classActive)) {
                elm.classList.remove(opt.classActive);
              }
            }
            else {
              if(elm.hasClass(opt.classActive)) {
                elm.removeClass(opt.classActive);
              }
            }
            var navigationHeader = document.querySelector('#' + opt.targetId);
            if(navigationHeader && navigationHeader.classList) {
              if(navigationHeader.classList.contains(opt.classOpen)) {
                navigationHeader.classList.remove(opt.classOpen);
              }
            }
            else {
              if(navigationHeader && navigationHeader.hasClass(opt.classOpen)) {
                navigationHeader.removeClass(opt.classOpen);
              }
            }
          }

        }
        else {
          // alert(123);
        }
      };
      self.getWidth = function () {
        var screenWidth = document.documentElement ? document.documentElement.clientWidth : window.innerWidth;
        var menuWidth = document.querySelector('#' + opt.targetId).offsetWidth;

        if(menuWidth < screenWidth) {
          opt.isScrollPage = true;
        }
        else {
          opt.isScrollPage = false;
        }
      };
      self.otherMethod = function () {
      };
    }
  };

  // ToggleMenu DATA API
  // =================
  var ToggleMenus = document.querySelectorAll('[data-toggle="ToggleMenu"]');
  for (var i = 0, len = ToggleMenus.length; i < len; i++ ) {
      var element = ToggleMenus[i],
          options = {
            targetId: 'menu-wrapper',
            classOpen: 'collapse',
            classActive: 'active',
            menuHeight: 0,
            targetElm: ''
          };
    new ToggleMenu(element, options);
  }

  return ToggleMenu;

});
