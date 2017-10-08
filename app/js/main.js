$(document).ready(function(){
	
	// Variables
	var body 							= $("body"),
			modalVisibility		= "vmodal_showing_in",
			active 						= "active",
			overlay 					= $("<div />", {
				class: "vmodal__overlay"
			});
	setTimeout(function(){
		body.addClass("loaded");
	}, 3000);
	// Menu
		$("[data-menu]").click(function(){
			var menu_href = $(this).attr("data-menu");
			//$(body).toggleClass('vnav-active');
			$(menu_href).toggleClass('vnav__menu_active');
			//$("[data-menu]").not($(this)).removeClass(active);
			$(this).toggleClass(active);
		});
		$('.vnav a[href*="#"]').click(function(){
			var href = $(this).attr('href');
			$('body,html').animate({
				scrollTop: $(href).offset().top
			},2000);
			$("[data-menu]").removeClass(active);
			$('.vnav-wrap-fixed .vnav').removeClass('vnav__menu_active');
			//body.toggleClass(active);
			return false;
		});
		$(".js-vnav-toggle").click(function(){
			$(this).toggleClass(active);
			$(".js-vnav-links").toggleClass(active);
		});
	// Scroll to block
		$('.anchor').click(function(){
			var href = $(this).attr('href');
			$('body,html').animate({
				scrollTop: $(href).offset().top
			},2000);
			return false;
		});
	// Modal
		var videoBlock = $('#modalvideo .vmodal-video');
		function videoBlockClear(){
			videoBlock.html('');
		}
		function videoBlockIsShowing(){
			if($("#modalvideo").hasClass(modalVisibility)){
				videoBlockClear();
			}
		}
		$('[data-func="vmodal"]').click(function(){
			var thisTarget = $(this).attr("data-target");
			videoBlockIsShowing();
			if ( $(thisTarget).length > 0 ) {
				$('.vmodal').removeClass(modalVisibility)
				$(thisTarget).addClass(modalVisibility);
				body.addClass("vmodal-open").append(overlay.addClass(modalVisibility));
			}else{
				console.log("No element with " + thisTarget + " name");
			}
		});
		$('[data-close="vmodal"]').click(function(){
			$(this).closest(".vmodal_showing_in").removeClass(modalVisibility);
			overlay.removeClass(modalVisibility);
			body.removeClass("vmodal-open");
		});
		overlay.click(function(e){
			if ( overlay.length > 0 ) {
				$(".vmodal_showing_in").removeClass(modalVisibility);
				overlay.removeClass(modalVisibility);
				videoBlockClear();
				body.removeClass("vmodal-open");
			}
		});
		$('.owl-carousel').owlCarousel({
			autoplay: true,
			loop: true,
			items: 1,
			nav: false,
			navText: ["",""],
			dots: true,
			responsive: {
				768: {
					nav: true
				}
			}
		});
		// Video
		// $('[data-video]').click(function(){
		// 	var thisVideo = $(this).attr('data-video');
		// 	var thisSource = $(this).attr('data-source');
		// 	var thisTitle = $(this).attr('data-title');
		// 	var output;
		// 	videoBlockClear();
		// 	if(thisTitle){
		// 		$("#modalvideo .vmodal-title").text(thisTitle);
		// 	}
		// 	if( thisSource == 'youtube'){
		// 		output = $('<iframe />', {
		// 			class: 'vmodal-iframe',
		// 			src: thisVideo + '?autoplay=1'
		// 		}).appendTo('#modalvideo .vmodal-video');
		// 	}
		// });
		// $("#modalvideo .vmodal-close").click(function(){
		// 	videoBlockClear();
		// });
	// Collapse
		// $(".vcollapse-inner.active").children(".vcollapse-body").slideDown();
		// $('.vcollapse-wrap').on('click', '.vcollapse-header', function(){
		// 	var collapseInner = $(this).parents('.vcollapse-wrap').find('.vcollapse-inner');
		// 	$(this).parent().toggleClass(active);
		// 	$(this).next().slideToggle('slow');
		// 	collapseInner.not($(this).parent()).removeClass("active");
		// 	collapseInner.children('.vcollapse-body').not($(this).next()).slideUp("slow");
		// });
	// Tabs
		// $('[data-func="tab"]').click(function(){			
		// 	// Tab links toggle class
		// 		$(this).closest(".vtabs-list").children("li").removeClass(active);
		// 		$(this).parent().addClass(active);
		// 	// Show tab content
		// 		var tabTarget = $(this).attr('data-target');
		// 		$(tabTarget).addClass(active);
		// 		$(".vtabs-content > div").not($(tabTarget)).removeClass(active);
		// });
	// Develope
		//alert($(window).height());
});	