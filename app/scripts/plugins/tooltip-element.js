
(function(factory){
  window.TooltipElement = factory();
})(function(){

  // TooltipElement DEFINITION
  // ===================
  var TooltipElement = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};

    this.init();
  };

  // TooltipElement METHODS
  // ================
  TooltipElement.prototype = {

    init : function() {
      var self = this, elm = self.element, opt = self.options;
      this.actions();

      function outSizeTooltip (e) {
        if(!document.getElementById(opt.idTooltip)) {
          return;
        }
        self.bodyClickOffToolTip(e);
      }
      if(!window.isMobileTablet) {
        elm.removeEventListenerOrDetachEventMultiEvent(self.tooltip, ['mouseenter']);
        elm.addEventListenerOrAttachEventMultiEvent(self.tooltip, ['mouseenter']);

        elm.removeEventListenerOrDetachEventMultiEvent(self.offTooltip, ['mouseleave']);
        elm.addEventListenerOrAttachEventMultiEvent(self.offTooltip, ['mouseleave']);
      }
      else {
        elm.removeEventListenerOrDetachEventMultiEvent(self.tooltip, [/*'click',*/ 'touchstart']);
        elm.addEventListenerOrAttachEventMultiEvent(self.tooltip, [/*'click',*/ 'touchstart']);


        document.body.removeEventListenerOrDetachEventMultiEvent(outSizeTooltip, [/*'click',*/ 'touchstart']);
        document.body.addEventListenerOrAttachEventMultiEvent(outSizeTooltip, [/*'click',*/ 'touchstart']);
      }

    },
    actions : function() {
      var self = this, elm = self.element, opt = self.options;
      // opt.tooltipType = elm.getAttribute('data-position') ? elm.getAttribute('data-position') : opt.tooltipType;
      self.tooltip = function (e) {
        e.preventDefault();
        self.offAllTooltips();

        var target = e.target || e.srcElement,
            elmTooltip = target.getAttribute(opt.elmTooltip) || target.closestAttributeName(opt.elmTooltip);

        var tooltip = document.createElement('div'),
            dataContent = opt.content ? opt.content : '<h3 class="title">Web &amp; mobile development</h3><div class="content"><p>E-Commerce, CMS, Intranet</p></div><span class="triangle"></span>';

        if(elmTooltip) {
          var parent = elm.parentNode;
          if(parent.querySelector('#' + opt.idTooltip)) {
            // parent.querySelector('#' + opt.idTooltip).removeClass(opt.classHide);
            parent.querySelector('#' + opt.idTooltip).fadeInFadeOut('in', 300);
          }
          else {
            if(tooltip.classList) {
              tooltip.classList.add(opt.classTooltip);
            }
            else {
              tooltip.addClass(opt.classTooltip);
            }

            parent.appendChild(tooltip);
            tooltip.style.display = 'block';
            tooltip.id = opt.idTooltip;
            tooltip.innerHTML = dataContent;

            tooltip = parent.querySelector('#' + opt.idTooltip);

            var tooltipHeight = tooltip.offsetHeight/*,
                tooltipWidth = tooltip.offsetWidth*/;

            var arrow = tooltip.querySelector('.triangle'),
                arrowWidth = arrow.offsetWidth,
                arrowHeight = 20;

            var spinner = parent,
                spinnerWidth = spinner.offsetWidth;

            var distanceRight = 30,
                distanceLeft = 20,
                top = - arrowHeight - tooltipHeight - 1;

            // is special tooltip
            if(opt.tooltipType) {
              tooltip.addClass(opt.tooltipType);
              var right = (spinnerWidth/2) - (arrowWidth/2);
              arrow.style.right = right + 'px';
              tooltip.style.right = 0 + 'px';

              arrow.style.right = (distanceRight + right) + 'px';
              tooltip.style.right = -distanceRight + 'px';
            }
            // is default tooltip
            else {
              var left = (spinnerWidth/2) - (arrowWidth/2);
              arrow.style.left = left + 'px';
              tooltip.style.left = 0 + 'px';

              arrow.style.left = (left + distanceLeft) + 'px';
              tooltip.style.left = -distanceLeft + 'px';
            }
            tooltip.style.top = top + 'px';
            tooltip.fadeInFadeOut('in', 300);
            tooltip.parentNode.addClass(opt.classActive);
          }
        }
      };
      self.offTooltip = function () {
        var tooltip = elm.parentNode.querySelector('#' + opt.idTooltip);
        if(tooltip) {
          if(tooltip.parentNode.hasClass(opt.classActive)) {
            tooltip.parentNode.removeClass(opt.classActive);
          }
          tooltip.parentNode.removeChild(tooltip);
        }
      };
      self.bodyClickOffToolTip = function (e) {
        var target = e.target || e.srcElement,
            elmTooltip = target.getAttribute(opt.elmTooltip) || target.closestAttributeName(opt.elmTooltip);

        if(!elmTooltip) {
         self.offAllTooltips();
        }
      };
      self.offAllTooltips = function () {
        var tooltips = document.querySelectorAll('#' + opt.idTooltip);
        for(var i = 0, len = tooltips.length; i < len; i++) {
          if(tooltips[i].parentNode.hasClass(opt.classActive)) {
            tooltips[i].parentNode.removeClass(opt.classActive);
          }
          tooltips[i].parentNode.removeChild(tooltips[i]);
        }
      };
      self.otherMethod = function () {
      };
    }
  };

  // TooltipElement DATA API
  // =================
  var TooltipElements = document.querySelectorAll('[data-toggle="TooltipElement"]');
  for (var i = 0, len = TooltipElements.length; i < len; i++ ) {
      var element = TooltipElements[i],
          options = {
            classActive: 'active',
            elmTooltip: 'data-tooltip-content',
            content: element.getAttribute('data-tooltip-content') ? element.getAttribute('data-tooltip-content') : '',
            classTooltip: 'ui-tooltip',
            idTooltip: 'id-tooltip',
            tooltipType: element.getAttribute('data-tooltip-type') ? element.getAttribute('data-tooltip-type') : '',
            classHide: 'hidden'
          };
    new TooltipElement(element, options);
  }

  return TooltipElement;

});
