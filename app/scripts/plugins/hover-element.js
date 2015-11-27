(function(factory){
  window.HoverElement = factory();
})(function(){

  // HoverElement DEFINITION
  // ===================
  var HoverElement = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};
    this.options.screenWidth = window.screen.width;

    this.init();
  };

  // HoverElement METHODS
  // ================
  HoverElement.prototype = {

    init : function() {
      var self = this, elm = self.element, opt = self.options;
      this.actions();

      // hover element in map - desktop
      if (!navigator.userAgent.match(/Android|BlackBerry|BB|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
        for (var i = 0, items = elm.querySelectorAll('[' + opt.item + ']'), len = items.length; i < len; i++) {
          items[i].removeEventListenerOrDetachEventMultiEvent ( self.hoverMap, ['mouseenter']);
          items[i].addEventListenerOrAttachEventMultiEvent ( self.hoverMap, ['mouseenter']);

          items[i].removeEventListenerOrDetachEventMultiEvent ( self.offHoverMap, ['mouseout']);
          items[i].addEventListenerOrAttachEventMultiEvent ( self.offHoverMap, ['mouseout' ]);
        }
      }

      if (navigator.userAgent.match(/Android|BlackBerry|BB|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){
        elm.addEventListenerOrAttachEventMultiEvent( function activeManagementTab (e) {
          var me = e.target || e.srcElement;
          var itemHover = me.hasClass(opt.itemToggle) ? me : me.closestClass(opt.itemToggle);
          if(itemHover) {
            var activeItems = elm.querySelectorAll('.' + opt.classActive);
            if(itemHover.hasClass(opt.classActive)) {
              // itemHover.removeClass(opt.classActive);
              for(var i = 0, len = activeItems.length; i < len; i++) {
                if(activeItems[i].hasClass(opt.classActive)) {
                  activeItems[i].removeClass(opt.classActive);
                }
              }
            }
            else {
              for(var j = 0, lenItems = activeItems.length; j < lenItems; j++) {
                if(activeItems[j].hasClass(opt.classActive)) {
                  activeItems[j].removeClass(opt.classActive);
                }
              }
              itemHover.addClass(opt.classActive);
            }
          }
        },['click']);

        // elm.removeEventListenerOrDetachEventMultiEvent('activeManagementTab', ['touchstart']);
      }

    },

    actions : function() {
      var self = this, /*elm = self.element,*/ opt = self.options;

      self.hoverMap = function (e) {
        var me = e.target || e.srcElement;
        var itemHover = me.getAttribute(opt.item) ? me : me.closestAttributeName(opt.item);
        if(itemHover) {
          var elementTarget = itemHover.getAttribute(opt.target) ? document.querySelector('[' + itemHover.getAttribute(opt.target) + ']') : '';
          if(elementTarget) {
            opt.elementTarget = elementTarget;
            if(elementTarget.classList) {
              elementTarget.classList.add(opt.classActive);
            }
            else {
              elementTarget.addClass(opt.classActive);
            }
          }
        }
      };
      self.offHoverMap = function () {
        if(opt.elementTarget) {
          if ( opt.elementTarget.classList && opt.elementTarget.classList.contains ( opt.classList ) ){
            opt.elementTarget.classList.remove(opt.classActive);
          }
          else if ( opt.elementTarget.hasClass ( opt.classActive ) ) {
            opt.elementTarget.removeClass ( opt.classActive );
          }
        }
      };
      self.clickMap = function (e) {
        var me = e.target || e.srcElement;
        var itemHover = me.getAttribute(opt.item) ? me : me.closestAttributeName(opt.item);
        if(itemHover) {
          var elementTarget = itemHover.getAttribute(opt.target) ? document.querySelector('[' + itemHover.getAttribute(opt.target) + ']') : '';
          if(elementTarget) {
            var groupTarget = elementTarget.parentNode,
                activeElementInGroup = groupTarget.querySelectorAll('.'+ opt.classActive);
            for(var i = 0, len = activeElementInGroup.length; i < len; i++) {
              var eachActiveElement = activeElementInGroup[i];
              if (eachActiveElement.classList) {
                eachActiveElement.classList.remove(opt.classActive);
              }
              else {
                eachActiveElement.removeClass(opt.classActive);
              }
            }
            opt.elementTarget = elementTarget;
            if(elementTarget.classList) {
              elementTarget.classList.add(opt.classActive);
            }
            else {
              elementTarget.addClass(opt.classActive);
            }
          }
        }
      };
      self.bodyClick = function (e) {
        var me = e.target || e.srcElement;
        var itemHover = me.getAttribute(opt.item) ? me : me.closestAttributeName(opt.item);
        if(!itemHover) {
          var items = document.querySelectorAll('[data-toggle="HoverElement" data-target]');
          for(var j = 0, lenitems = items.length; j < lenitems; j++) {
            var elementTarget = items[j].getAttribute(opt.target) ? document.querySelector('[' + items[j].getAttribute(opt.target) + ']') : '';
            if(elementTarget) {
              var groupTarget = elementTarget.parentNode,
                  activeElementInGroup = groupTarget.querySelectorAll('.'+ opt.classActive);
              for(var i = 0, len = activeElementInGroup.length; i < len; i++) {
                var eachActiveElement = activeElementInGroup[i];
                if (eachActiveElement.classList) {
                  eachActiveElement.classList.remove(opt.classActive);
                }
                else {
                  eachActiveElement.removeClass(opt.classActive);
                }
              }
            }
          }
        }
      };
    }
  };

  // HoverElement DATA API
  // =================
  var HoverElements = document.querySelectorAll('[data-toggle="HoverElement"]');
  for (var i = 0, len = HoverElements.length; i < len; i++ ) {
      var element = HoverElements[i],
          options = {
            value : '',
            item: 'data-item-hover',
            itemToggle: 'item',
            target: 'data-target',
            elementTarget: '',
            classActive: 'active',
            classHide: 'hide'
          };
    new HoverElement(element, options);
  }
  return HoverElement;
});
