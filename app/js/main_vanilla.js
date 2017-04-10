
	// document.addEventListener("DOMContentLoaded", function(){

	// 	function hasClass(element, cls) {
	// 	  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	// 	}
	// 	function addClass(element,cls){
	// 		if( !hasClass(element, cls) )
	// 			element.className += ' ' + cls;
	// 	}
	// 	function removeClass(element, cls){
	// 			if(hasClass(element, cls)){
	// 				element.classList.remove(cls);
	// 			}
	// 	}

	// 	// Variables
	// 	var d = document;

	// 	var classes = {
	// 		backdrop: 'vmodal-backdrop',
	// 		showing: 'showing-in',
	// 		open: 'vmodal-open'
	// 	};
	// 	var modals = d.querySelectorAll('.vmodal');
	// 	var modalButtons = d.querySelectorAll('[data-func="vmodal"]');
	// 	var modalCloseButtons = d.querySelectorAll('[data-close="vmodal"]');
	// 	var modalBackdrop = d.createElement('div');
		
	// 	d.body.appendChild(modalBackdrop);
	// 	addClass(modalBackdrop, classes.backdrop);
		
	// 	function modalOpen(){
	// 		var thisTarget = this.dataset.target;
	// 		for(var i = 0; i < modals.length; i++){
	// 			removeClass(modals[i], classes.showing);
	// 		}
	// 		addClass(d.querySelector(thisTarget), classes.showing);
	// 		addClass(d.body, classes.open);
	// 		addClass(modalBackdrop, classes.showing);
	// 	}
	// 	function modalClose(){
	// 		removeClass(modalBackdrop, classes.showing);
	// 		removeClass(d.body, classes.open);
	// 	}
	// 	function modalWindowClick(e){
	// 		if( hasClass(e.target, 'vmodal') ){
	// 			removeClass(d.querySelector('.vmodal.showing-in'), classes.showing);
	// 			modalClose();
	// 		}
	// 	}
	// 	for(var i = 0; i < modalButtons.length; i++){
	// 		modalButtons[i].addEventListener('click', modalOpen);
	// 	}
	// 	for(var i = 0; i < modalCloseButtons.length; i++){
	// 		modalCloseButtons[i].addEventListener('click', function(){
	// 			removeClass(this.closest('.showing-in'), classes.showing);
	// 			modalClose();
	// 		});
	// 	}
	// 	window.addEventListener('click', modalWindowClick);
	// });

(function(){

	// General functions
	function log(logText){
		console.log(logText);
	}
	function hasClass(element, cls) {
	  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}
	function addClass(element,cls){
		if( !hasClass(element, cls) )
			element.className += ' ' + cls;
	}
	function removeClass(element, cls){
			if(hasClass(element, cls)){
				element.classList.remove(cls);
			}
	}
	// Modal conctructor
	this.Modal = function(){

    // Create global element references
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;
    this.name = "vmodal";

    this.classes = {
			showing: this.name + '_showing_in',
			overlay: this.name + '__overlay'
		}
		var defaults = {
			id: null,
			className: this.name + "_default " + this.name + "_center",
			closeButton: true,
			title: null,
			titleClass: this.name + "__title",
			titleTag: "p",
			content: null,
			overlay: true
		}
		
		this.options = extendDefaults(defaults, arguments[0]);
		//this.appendToDocument();
	}	


	// Public methods

	// Modal.prototype.appendToDocument = function(){
		
	// }

	Modal.prototype.open = function(){
		buildOut.call(this);
		initialize.call(this);
		addClass(this.modal, this.classes.showing);
		addClass(this.overlay, this.classes.showing);
		
	}	

	Modal.prototype.close = function(){
		this.modal.parentNode.removeChild(this.modal);
		this.overlay.parentNode.removeChild(this.overlay);
		removeClass(this.overlay, this.classes.showing);
		removeClass(this.modal, this.classes.showing);
	}


	// Private functions

	function extendDefaults(oldObject, newObject){
		var property;
		for(property in newObject){
			if(newObject.hasOwnProperty(property)){
				oldObject[property] = newObject[property];
			}
		}
		return oldObject;
	}


	function buildOut(){
		var d = document, dFragment, dialog, box, title, content, header, body, footer;

		dFragment = d.createDocumentFragment();

		function newElem(tag, params, parentName){
			var elem = document.createElement(tag);
			for(p in params){
				elem.setAttribute(p, params[p]);
			}
			if(parentName){
				parentName.appendChild(elem);
			}
			return elem;
		}
		// Create wrap
			this.modal = newElem("div",{
				'id': this.options.id,
				'class': this.name + " " + this.options.className
			});

		// Create box
			box = newElem("div",{
				'class': this.name + "__box"
			}, this.modal);

		// Create header
			header = newElem("div",{
				'class': this.name + "__header"
			}, box);

		// Create body
			body = newElem("div",{
				'class': this.name + "__body"
			}, box);

		// Create footer
			footer = newElem("div",{
				'class': this.name + "__footer"
			}, box);


		if(this.options.closeButton == true){
			this.closeButton = newElem("button", {
				'class': this.name + "__close",
				'data-close': this.name
			}, header);
			this.closeButton.innerHTML = "&times;";
		}


		if(typeof this.options.title === "string"){
			title = newElem(this.options.titleTag, {
				'class': this.options.titleClass
			}, header);
			title.innerHTML = this.options.title;
		}


		if(typeof this.options.content === "string"){
			content = this.options.content;
		}else{
			content = this.options.content.innerHTML;
		}
		body.innerHTML = content;


		dFragment.appendChild(this.modal);

		if(this.options.overlay == true){
			this.overlay = newElem("div",{
				'class': this.classes.overlay
			}, dFragment);
		}


		d.body.appendChild(dFragment);
	}


	function initialize(){
		
		if(this.overlay){
			this.overlay.addEventListener('click', this.close.bind(this));
		}
		if(this.closeButton){
			this.closeButton.addEventListener('click', this.close.bind(this));
		}
	}

	document.addEventListener("DOMContentLoaded", function(){
		var 
			modalBtn = document.querySelectorAll('[data-func="vmodal"]'),
			allModals = [],
			modalTarget,
			modalTitle,
			modalContent;

		for(var i = 0; i < modalBtn.length; i++){
			modalBtn[i].addEventListener('click', function(){
				modalTitle = this.dataset.title;
				modalContent = this.dataset.content.replace("#", "");
				modalTarget = this.dataset.target.replace("#", "");
				allModals[i] = modalTarget;
				allModals[i] = new Modal({
					id: modalTarget,
					title: modalTitle,
					content: document.getElementById(modalContent)
				}).open();
			});
		}
	});
}());