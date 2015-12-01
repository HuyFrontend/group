// (function(factory){
//   window.CareerElement = factory();
// })(function(){

//   // CareerElement DEFINITION
//   // ===================
//   var CareerElement = function( element, options ) {
//     options = options || {};
//     this.element = typeof element === 'object' ? element : document.querySelector(element);
//     this.options = typeof options === 'object' ? options : {};

//     this.init();
//   };

//   // CareerElement METHODS
//   // ================
//   CareerElement.prototype = {

//     init : function() {

//       var self = this, elm = self.element, opt = self.options;
//       var applyBlock = elm.querySelector('[' + opt.thisBlock + ']');
//       var detailBlock = elm.querySelector('[' + opt.targetBlock + ']');
//       opt.elementAply = applyBlock ? applyBlock : opt.elementAply;
//       opt.elementDetail = detailBlock ? detailBlock : opt.elementDetail;


//       this.actions();

//       // window.removeEventListenerOrDetachEventMultiEvent(resizeHeightItemSlider,['resize']);
//       // window.addEventListenerOrAttachEventMultiEvent(resizeHeightItemSlider,['resize']);

//       function getCareerForm(e) {
//         var target = e.target || e.scrElement;
//         if(target.hasAttribute('data-item')  || target.closestAttributeName('data-item')) {
//           var link = target.hasAttribute('data-item') ? target.getAttribute('data-target') : target.closestAttributeName('data-item').getAttribute('data-target');
//           self.ajax(link);
//         }
//         if(target.hasAttribute(opt.btnBack) || target.closestAttributeName(opt.btnBack)) {
//           self.hideAndShow(opt.elementDetail, opt.elementAply);
//         }
//       }
//       elm.removeEventListenerOrDetachEventMultiEvent(getCareerForm,['click']);
//       elm.addEventListenerOrAttachEventMultiEvent( getCareerForm,['click']);
//     },

//     actions : function() {
//       var self = this, elm = self.element, opt = self.options;
//       self.clickItem = function () {

//       };
//       self.ajax = function (link) {

//         var request = new window.RequestAjax();
//         var type = 'get',
//             parrams = '';
//         request.sendRequest(link, self.getSuccess, self.getError, type, parrams);
//       };
//       self.getSuccess = function (data) {

//         if(opt.elementDetail) {
//           opt.elementDetail.innerHTML = data;
//           self.hideAndShow(opt.elementAply, opt.elementDetail);
//         }
//       };
//       self.getError = function () {
//         // console.log('err', err);
//       };
//       self.hideAndShow = function (elementHide, elementShow) {
//         elementShow.fadeInFadeOut('in', 500);
//         elementHide.fadeInFadeOut('out', 500);
//         if(elementShow.classList) {
//           elementShow.classList.remove(opt.classHidden);
//         }
//         else {
//           elementShow.removeClass(opt.classHidden);
//         }
//         if(elementHide.classList) {
//           elementHide.classList.add(opt.classHidden);
//         }
//         else {
//           elementHide.addClass(opt.classHidden);
//         }
//       };
//     }
//   };

//   // CareerElement DATA API
//   // =================
//   var CareerElements = document.querySelectorAll('[data-toggle="CareerElement"]');
//   for (var i = 0, len = CareerElements.length; i < len; i++ ) {
//       var element = CareerElements[i],
//           options = {
//             targetLink: '',
//             classActive: 'active',
//             classHidden: 'hide',
//             classDisabled: 'disabled',
//             item: 'data-item',
//             thisBlock:'data-apply',
//             targetBlock: 'data-detail',
//             btnBack: 'data-return',
//             elementAply: '',
//             elementDetail: ''
//           };
//     new CareerElement(element, options);
//   }
//   return CareerElement;
// });
