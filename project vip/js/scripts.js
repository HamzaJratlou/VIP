(function($){

	"use strict";

	$(window).load(function() {

		// Preloader
		$('.loader').fadeOut();
		$('.loader-mask').delay(350).fadeOut('slow');

		$(window).trigger("resize");
		masonry();
		initOwlCarousel();

	});


	$(window).resize(function(){

		megaMenu();
		megaMenuWide();
		container_full_height_init();
		container_photo_height_init();
		$.stellar('refresh');

		var windowWidth = $(window).width();		
		if (windowWidth <= 974) {
			$('.dropdown-toggle').attr('data-toggle', 'dropdown');
			$('.navigation, .navigation-overlay').removeClass("sticky offset scrolling");
			$('.nav-type-1 nav.navbar').removeClass('navbar-fixed-top');    	
		}
		if (windowWidth > 974) {
			$('.dropdown-toggle').removeAttr('data-toggle', 'dropdown');
			$('.dropdown').removeClass('open');
			$('.navigation-overlay nav.navbar').addClass('navbar-fixed-top');
		}

		/* Mobile Menu Resize
		-------------------------------------------------------*/
		$(".navbar .navbar-collapse").css("max-height", $(window).height() - $(".navbar-header").height() );
		
	});


	/* Sticky Navigation
	-------------------------------------------------------*/
	$(window).scroll(function(){

		var windowWidth = $(window).width();		
		if ($(window).scrollTop() > 190 & windowWidth > 974){
			$('.navigation-overlay, .navigation').addClass("sticky");
			$('.logo-wrap').addClass("shrink");
		} else {
			$('.navigation-overlay, .navigation').removeClass("sticky");
			$('.logo-wrap').removeClass("shrink");
		}

		if ($(window).scrollTop() > 200 & windowWidth > 974){
			$('.navigation').addClass("offset");
		} else {
			$('.navigation').removeClass("offset");
		}

		if ($(window).scrollTop() > 500 & windowWidth > 974){
			$('.navigation').addClass("scrolling");
		} else {
			$('.navigation').removeClass("scrolling");
		}


		if ($(window).scrollTop() > 190 ){
			$('.navbar-fixed-top').addClass("sticky");
		} else {
			$('.navbar-fixed-top').removeClass("sticky");
		}

	});


	/* Onepage Nav
	-------------------------------------------------------*/
	$('.onepage-nav .navbar-collapse ul li a').on('click',function() {
		$(".navbar-collapse").collapse('hide');
		return false;
	});

	// Smooth Scroll Navigation
	$('.local-scroll').localScroll({offset: {top: -60},duration: 1500,easing:'easeInOutExpo'});


	/* Full screen Navigation
	-------------------------------------------------------*/
	$('#nav-icon, .overlay-menu').on("click", function(){
		$('#nav-icon, #overlay').toggleClass('open');
		$('body').toggleClass('fs-open');


		$(function(){
	 
		var delay = 0

			$('.overlay-menu > ul > li').each(function(){
				$(this).css({animationDelay: delay+'s'})
				delay += 0.1
			})
 
		})

	});


	/* Bootstrap Dropdown Navigation
	-------------------------------------------------------*/
	"use strict";!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(b){this.$element=a(b),this.$main=this.$element.closest(".dropdown, .dropup, .btn-group"),this.$menu=this.$element.parent(),this.$drop=this.$menu.parent().parent(),this.$menus=this.$menu.siblings(".dropdown-submenu");var d=this.$menu.find("> .dropdown-menu > "+c);this.$submenus=d.filter(".dropdown-submenu"),this.$items=d.not(".dropdown-submenu"),this.init()}var c=":not(.disabled, .divider, .dropdown-header)";return b.prototype={init:function(){this.$element.on({"click.bs.dropdown":this.click.bind(this),keydown:this.keydown.bind(this)}),this.$menu.on("hide.bs.submenu",this.hide.bind(this)),this.$items.on("keydown",this.item_keydown.bind(this)),this.$menu.nextAll(c+":first:not(.dropdown-submenu)").children("a").on("keydown",this.next_keydown.bind(this))},click:function(a){a.stopPropagation(),this.toggle()},toggle:function(){this.$menu.hasClass("open")?this.close():(this.$menu.addClass("open"),this.$menus.trigger("hide.bs.submenu"))},hide:function(a){a.stopPropagation(),this.close()},close:function(){this.$menu.removeClass("open"),this.$submenus.trigger("hide.bs.submenu")},keydown:function(a){if(/^(32|38|40)$/.test(a.keyCode)&&a.preventDefault(),/^(13|32)$/.test(a.keyCode))this.toggle();else if(/^(27|38|40)$/.test(a.keyCode))if(a.stopPropagation(),27==a.keyCode)this.$menu.hasClass("open")?this.close():(this.$menus.trigger("hide.bs.submenu"),this.$drop.removeClass("open").children("a").trigger("focus"));else{var b=this.$main.find("li:not(.disabled):visible > a"),c=b.index(a.target);if(38==a.keyCode&&0!==c)c--;else{if(40!=a.keyCode||c===b.length-1)return;c++}b.eq(c).trigger("focus")}},item_keydown:function(a){27==a.keyCode&&(a.stopPropagation(),this.close(),this.$element.trigger("focus"))},next_keydown:function(a){if(38==a.keyCode){a.preventDefault(),a.stopPropagation();var b=this.$drop.find("li:not(.disabled):visible > a"),c=b.index(a.target);b.eq(c-1).trigger("focus")}}},a.fn.submenupicker=function(c){var d=this instanceof a?this:a(c);return d.each(function(){var c=a.data(this,"bs.submenu");c||(c=new b(this),a.data(this,"bs.submenu",c))})}});
	$('.dropdown-submenu > a').submenupicker();


	/* Mobile Navigation 
	-------------------------------------------------------*/
	$('.dropdown-toggle').on('click', function(e){ e.preventDefault(); });
	

	/* Mobile Detect
	-------------------------------------------------------*/
	if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
		 $("html").addClass("mobile");
		 $('.dropdown-toggle').attr('data-toggle', 'dropdown');
	}
	else {
		$("html").removeClass("mobile");
	}


	/* IE Detect
	-------------------------------------------------------*/
	if(Function('/*@cc_on return document.documentMode===10@*/')()){ $("html").addClass("ie"); }


	/* Mega Menu
	-------------------------------------------------------*/
	function megaMenu(){

		$('.megamenu').each(function () {
			$(this).css('width', $('.container').width());
			var offset = $(this).closest('.dropdown').offset();
			offset = offset.left;
			var containerOffset = $(window).width() - $('.container').outerWidth();
			containerOffset = containerOffset /2;
			offset = offset - containerOffset - 15;
			$(this).css('left', -offset);
		});

	}

	function megaMenuWide(){

		$('.megamenu-wide').each(function () {
			$(this).css('width', $('.container-fluid').width());
			var offset = $(this).closest('.dropdown').offset();
			offset = offset.left;
			var containerOffset = $(window).width() - $('.container-fluid').outerWidth();
			containerOffset = containerOffset /2;
			offset = offset - containerOffset - 50;
			$(this).css('left', -offset);
		});

	}


	/* Text Rotator
	-------------------------------------------------------*/
	$(".rotate").textrotator({
		animation: "dissolve",
		separator: ",",
		speed: 3000 
	});


	/* Counters
	-------------------------------------------------------*/
	$('.statistic').appear(function() {
		$('.timer').countTo({
			speed: 4000,
			refreshInterval: 60,
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			}
		});
	});


	/* Equal Height
	-------------------------------------------------------*/

	$('.equal-height').matchHeight({
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	});


	/* Grid/list Switch
	-------------------------------------------------------*/

	function get_grid(){
		 $('.list').removeClass('list-active');
		 $('.grid').addClass('grid-active');
		 $('.product-item').animate({opacity:0},function(){
		 $('.shop-catalogue').removeClass('list-view').addClass('grid-view');
		 $('.product').addClass('product-grid').removeClass('product-list');
		 $('.product-item').stop().animate({opacity:1});
		 });
	}

	function get_list(){
		$('.grid').removeClass('grid-active');
		$('.list').addClass('list-active');
		$('.product-item').animate({opacity:0},function(){
			$('.shop-catalogue').removeClass('grid-view').addClass('list-view');
			$('.product').addClass('product-list').removeClass('product-grid');
			$('.product-item').stop().animate({opacity:1});
		});
	}

	$('#list').on('click', function(){   
		get_list();
	});

	$('#grid').on('click', function(){ 
		get_grid();
	});



	/* Owl Carousel
	-------------------------------------------------------*/

	function initOwlCarousel(){
		(function($){
			"use strict";

			/* Partners Logo
			-------------------------------------------------------*/

			$("#owl-partners").owlCarousel({

				autoPlay: 3000,
				pagination: false,
				itemsCustom: [
					[0, 2],      
					[450, 2],
					[700, 3],
					[1000, 3],
					[1200, 4],
					[1400, 5],
					[1600, 6]
				],

			})


			/* Testimonials
			-------------------------------------------------------*/

			$("#owl-testimonials").owlCarousel({
		 
				navigation: false,
				autoHeight: true,
				slideSpeed: 300,
				pagination: true,
				paginationSpeed: 400,
				singleItem: true,
				stopOnHover: true
		 
			})


			// style-3
			$("#owl-testimonials-boxes").owlCarousel({
			
				navigation: false,
				slideSpeed: 300,
				pagination: true,
				paginationSpeed: 400,
				stopOnHover: true,
				itemsCustom: [
					[0, 1],      
					[450, 1],
					[700, 2],
					[1200, 2]
				],
			
			})


			/* Fetured Works
			-------------------------------------------------------*/

			$("#owl-featured-works").owlCarousel({

				navigation: true,
				pagination: false,
				navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
				itemsCustom: [
					[0, 1],      
					[450, 2],
					[700, 3],
					[1000, 3],
					[1200, 3],
					[1400, 4],
					[1600, 4]
				],

			})


			/* Photography v2
			-------------------------------------------------------*/

			$("#owl-photography").owlCarousel({
				
				autoHeight: true,
				navigation: true,
				slideSpeed: 700,
				singleItem: true,
				navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
		 
			})


			/* Single Image
			-------------------------------------------------------*/

			$("#owl-single").owlCarousel({
		 
				navigation: true,
				slideSpeed: 300,
				paginationSpeed: 400,
				singleItem: true,
				navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
		 
			})


			/* Agency Promo
			-------------------------------------------------------*/
			var owlpromo = $("#owl-promo")
			owlpromo.owlCarousel({

				pagination: false,
				singleItem: true,
				transitionStyle : "goDown"

			})


			/* Related Works
			-------------------------------------------------------*/

			var owl = $("#owl-related-works"); 
			owl.owlCarousel({

				slideSpeed: 300,
				paginationSpeed: 400,
				items: 3,
				itemsDesktop: [1199,3],
				itemsDesktopSmall: [979,3],
				pagination: false

			});

			// Custom Navigation Events
			$(".next").on('click',function(){
				owl.trigger('owl.next');
				owlpromo.trigger('owl.next');
			})
			$(".prev").on('click',function(){
				owl.trigger('owl.prev');
				owlpromo.trigger('owl.prev');
			});


			/* Related Shop Products
			-------------------------------------------------------*/

			$("#owl-related-products").owlCarousel({

				slideSpeed: 300,
				paginationSpeed: 400,
				items: 4,
				itemsDesktop: [1199,4],
				itemsDesktopSmall: [979,3],
				pagination: false,
				autoPlay: true,
				stopOnHover: true

			});

		})(jQuery);
	};


	/* Slick Slider
	-------------------------------------------------------*/

	$('.slick-slider.photography-v2').slick({
		centerMode: true,
		centerPadding: '370px',
		slidesToShow: 1,
		touchThreshold: 15,
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				centerMode: false,
				slidesToShow: 1
			}
		}
		]
	});


	var slides = $(".slider-for .slick-track > .slick-slide").length;
	$('.slider-for').on('afterChange', function(event, slick, currentSlide, nextSlide){
		var inFocus = $('.slider-for .slick-current').attr('data-slick-index');
		$('.slider-nav .slick-current').removeClass('slick-current');
		$('.slider-nav .slick-slide[data-slick-index="' + inFocus + '"]').addClass('slick-current');
	});


	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		touchThreshold: 15,
		arrows: true,
		fade: true,
		asNavFor: '.slider-nav'
	});

	$('.slider-nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		touchThreshold: 15,
		asNavFor: '.slider-for',
		dots: true,
		centerMode: false,
		focusOnSelect: true
	});




	/* Parallax
	-------------------------------------------------------*/

	$.stellar({
		horizontalScrolling: false
	});


	$(window).load(function() {			

		setTimeout(function() {
			$.stellar('refresh');
		}, 1000);

	});


	// Wow Animations

	var wow = new WOW({
		offset: 50,
		mobile: false
	});

	wow.init();

	/* Contact Form
	-------------------------------------------------------*/

	var submitContact = $('#submit-message'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],input[type=email],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});


})(jQuery);


/* Scroll to Top
-------------------------------------------------------*/

(function() {
	"use strict";

	var docElem = document.documentElement,
		didScroll = false,
		changeHeaderOn = 550;
		document.querySelector( '#back-to-top' );
	function init() {
		window.addEventListener( 'scroll', function() {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 50 );
			}
		}, false );
	}
	
})();

$(window).scroll(function(event){
	var scroll = $(window).scrollTop();
	if (scroll >= 50) {
		$("#back-to-top").addClass("show");
	} else {
		$("#back-to-top").removeClass("show");
	}

});

$('a[href="#top"]').on('click',function(){
	$('html, body').animate({scrollTop: 0}, 1350, "easeInOutQuint");
	return false;
});


/* Full Height Container
-------------------------------------------------------*/

function container_full_height_init(){
	(function($){
		$(".container-full-height").height($(window).height());
	})(jQuery);
}


/* Container Photo Height
-------------------------------------------------------*/

function container_photo_height_init(){
	(function($){
		$(".container-photo-height").height($(window).height() - $(".nav-type-2").height() - $(".footer-type-5").height() );
	})(jQuery);
}


