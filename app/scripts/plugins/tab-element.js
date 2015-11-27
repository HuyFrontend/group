
(function(factory){
  window.TabElement = factory();
})(function(){

  // TabElement DEFINITION
  // ===================
  var TabElement = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};

    this.init();
  };
  // TabElement METHODS
  // ================
  TabElement.prototype = {

    init : function() {
     var self = this, elm = self.element;
      this.actions();

      function clickTab(e) {
        self.clickTab(e);
      }
      elm.removeEventListenerOrDetachEventMultiEvent(clickTab, ['click']);
      elm.addEventListenerOrAttachEventMultiEvent(clickTab, ['click']);
    },

    actions : function() {
      var self = this, /*elm = self.element, */opt = self.options;

      self.clickTab = function (e) {
        var target = e.target || e.srcElement,
            tabItem = target.getAttribute('data-target') ? target : target.closestAttributeName(opt.tabItem);
        // console.log(123);
        if(tabItem) {
          // console.log(targetElement);
          var items = tabItem.parentNode.querySelectorAll('[' + opt.tabItem + ']');
          var targetElement = document.querySelector('[data-item="' + tabItem.getAttribute(opt.target) + '"]');
          for( var i = 0, len = items.length; i < len; i++) {
            if(items[i].classList) {
              items[i].classList.remove(opt.classActive);
            }
            else {
              items[i].removeClass(opt.classActive);
            }
          }
          if(tabItem.classList) {
            tabItem.classList.add(opt.classActive);
          }
          else {
            tabItem.addClass(opt.classActive);
          }
          // active target block
          if(targetElement) {
            var blockTarget = targetElement.parentNode,
                itemsTarget = blockTarget.querySelectorAll('[data-item]');
            for (var j = 0, lenTarget = itemsTarget.length; j < lenTarget; j++) {
              if(itemsTarget[j].classList) {
                itemsTarget[j].classList.add(opt.classHide);
              }
              else {
                itemsTarget[j].addClass(opt.classHide);
              }
            }
            if(targetElement.classList) {
              targetElement.classList.remove(opt.classHide);
            }
            else {
              targetElement.removeClass(opt.classHide);
            }
          }
          // $('[data-slider]')['slider']();
        }
      };
      self.otherMethod = function () {
      };
    }
  };

  // TabElement DATA API
  // =================
  var TabElements = document.querySelectorAll('[data-toggle="TabElement"]');
  for (var i = 0, len = TabElements.length; i < len; i++ ) {
      var element = TabElements[i],
          options = {
            value : '',
            tabItem: 'data-item-tab',
            target: 'data-target',
            classActive: 'active',
            classHide: 'hide'
          };
    new TabElement(element, options);
  }
  return TabElement;
});
