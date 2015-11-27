(function(factory){
  window.SetHeightItem = factory();
})(function(){

  // SetHeightItem DEFINITION
  // ===================
  var SetHeightItem = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};
    this.options.screenWidth = window.screen.width;

    this.init();
  };

  // SetHeightItem METHODS
  // ================
  SetHeightItem.prototype = {

    init : function() {
      var self = this, elm = self.element, opt = self.options;
      var items = elm.querySelectorAll('.' + opt.classItemSetHeight);
      this.actions();
      this.resetHeight(items, this.getMaxHeight(items));

      var resizeId;
      function resetHeightWhenResize () {
        self.beforResize(items);
        self.resetHeight(items, self.getMaxHeight(items));
      }
      function resizeHeightItemSlider () {
        clearTimeout(resizeId);
        var functionResize = resetHeightWhenResize();
        resizeId = setTimeout(functionResize, 0);
      }
      window.removeEventListenerOrDetachEventMultiEvent(resizeHeightItemSlider,['resize']);
      window.addEventListenerOrAttachEventMultiEvent(resizeHeightItemSlider,['resize']);

    },

    actions : function() {
      var self = this/*, elm = self.element, opt = self.options*/;
      self.getMaxHeight = function (items) {
        var listHeight = [], listItem = [];
        var maxHeight;
        for (var i = 0, len = items.length; i < len; i++) {
          var thisItemHeight = items[i].offsetHeight;
          listHeight.push(thisItemHeight);
          listItem.push(items[i]);
        }
        if (listHeight.length) {
          // maxHeight = Math.max(...listHeight); // new
          maxHeight = window.getMaxOfArray(listHeight);

        }
        return maxHeight;
      };

      self.resetHeight = function (items, value) {
        for (var i = 0, len = items.length; i < len; i++) {
          var thisItem = items[i];
          thisItem.style.height = value + 'px';
        }
      };

      self.beforResize = function (items) {
        for (var i = 0, len = items.length; i < len; i++) {
          var thisItem = items[i];
          thisItem.style.height = 'auto';
        }
      };
    }
  };

  // SetHeightItem DATA API
  // =================
  var SetHeightItems = document.querySelectorAll('[data-toggle="SetHeightItem"]');
  for (var i = 0, len = SetHeightItems.length; i < len; i++ ) {
      var element = SetHeightItems[i],
          options = {
            elementTarget: '',
            classActive: 'active',
            classHide: 'hide',
            classItemSetHeight: 'item ul',
            classGroup: 'item',
            classTitle: 'service-title'
          };
    new SetHeightItem(element, options);
  }
  return SetHeightItem;
});
