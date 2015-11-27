

(function(factory){
  window.RequestAjax = factory();
})(function(){

  // RequestAjax DEFINITION
  // ===================
  var RequestAjax = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    // this.option = typeof option === 'string' ? option : null;
    this.options = options;

    this.init();
  };

  // RequestAjax METHODS
  // ================
  RequestAjax.prototype.init = function() {
    // var self = this;
  };
  RequestAjax.prototype.sendRequest = function (url, success, error, methodType, params) {
    // Feature detection, url: url, success/error: callback when ajax done, method: get/post, params: data
    if ( !window.XMLHttpRequest ) {
      return;
    }
    // Create new request
    var request = new XMLHttpRequest();
    // Setup callbacks
    request.onreadystatechange = function () {
      // If the request is complete
      if ( request.readyState === 4 ) {
          // If the request failed
        if ( request.status !== 200 ) {
          if ( error && typeof error === 'function' ) {
            error( request.responseText, request );
          } else {
            this.error(request.responseText, request);
          }
          return;
        }
        // If the request succeeded
        if ( success && typeof success === 'function' ) {
          success( request.responseText, request );
        } else {
          this.success(request.responseText, request);
        }
      }
    };
    if(!methodType) {
      methodType = 'GET';
    }
    request.open( methodType, url );
    request.send(params);

  };
  RequestAjax.prototype.success = function (data) {
    return data;
  };
  RequestAjax.prototype.error = function (err) {
    return err;
  };

  // RequestAjax DATA API
  // =================
  var RequestAjaxs = document.querySelectorAll('[data-toggle="RequestAjax"]');

  for (var i = 0, len = RequestAjaxs.length; i < len; i++ ) {
    var element = RequestAjaxs[i], options;
    new RequestAjax(element, options);
  }

  return RequestAjax;

});
