/**
 *  @name slide
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
  var pluginName = 'slide',
    BANNER = 'banner';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var self = this;
      switch (this.options.type) {
        case BANNER:
          this.initBanner();
          break;
        case 'office':
          this.initOffice();
          break;
        case 'manager':
          this.initManager();
          break;
        case 'ourService':
          this.initOurService();
          break;
        case 'ourCaseStudy':
          this.initOurCaseStudy();
          break;
        default:
          this.initBanner();
      }
      //
      $(document).off('click.initSlider').on('click.initSlider', '[data-item-tab]', function(e) {
        var target = $(e.target);
        var thisTab = target.attr('data-item-tab') ? target : target.closest('[data-item-tab]');
        var itemTarget = thisTab.attr('data-target');
        var thisSlide = $('[data-item="'+ itemTarget + '"]');
        var slideLength = thisSlide.attr('data-slidetablet');
        self.initSlider(slideLength);
      });
    },
    initSlider: function (slidetablet) {
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        autoplaySpeed: 10000,
        infinite: true,
        pauseOnHover: true,
        slidesToShow: 5,
        draggable: false,
        arrows: true,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },{
          breakpoint: 1025,
          settings: {
            slidesToShow: slidetablet ? slidetablet : 5,
            slidesToScroll: 1
          }
        }]
      };

      var officeSlider = $('[data-slide].list-offices'),
          isInnitSlick = officeSlider.find('.slick-track').length ? true : false;
      if(isInnitSlick) {
        officeSlider.slick('unslick');
      }
      officeSlider.not('.hide').slick(optionSlick);
    },
    initOffice: function() {
      var that = this;
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        autoplaySpeed: that.options.autoplayspeed,
        infinite: true,
        pauseOnHover: true,
        draggable: false,
        useCSS: false,
        slidesToShow: that.options.slidetoshow,
        arrows: true,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },{
          breakpoint: 1025,
          settings: {
            slidesToShow: that.options.slidetablet ? that.options.slidetablet : 5,
            slidesToScroll: 1
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    initManager: function() {
      var that = this/*, opt = that.options*/;
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        autoplaySpeed: that.options.autoplayspeed,
        infinite: true,
        pauseOnHover: true,
        draggable: false,
        slidesToShow: 4,
        useCSS:false,
        arrows: true,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true,
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            draggable: true,
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    initOurService: function() {
      var that = this/*, opt = that.options*/;
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        autoplaySpeed: that.options.autoplayspeed,
        infinite: true,
        pauseOnHover: true,
        draggable: false,
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: true,
            slidesToScroll: 1
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    initOurCaseStudy: function() {
      var that = this/*, opt = that.options*/;
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        autoplaySpeed: that.options.autoplayspeed,
        infinite: true,
        pauseOnHover: true,
        draggable: false,
        slidesToShow: 1,
        arrows: true,
        useCSS: false,
        adaptiveHeight: true,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true
          },
        }, {
          breakpoint: 767,
          settings: {
            dots: true
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    initBanner: function() {
      var that = this;
      var optionSlick = {
        accessibility: false,
        autoplay: true,
        autoplaySpeed: that.options.autoplayspeed,
        infinite: true,
        pauseOnHover: true,
        useCSS: false,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        draggable: false,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    destroy: function() {
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
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    autoplayspeed: 10000,
    classSlickTrack: 'slick-track',
    slidetoshow: 5,
    slideTablet:'data-slidetablet'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
