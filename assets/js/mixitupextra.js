/*
MixItUp Marketing Site Javascript
http://www.barrelny.com
*/

var latest = "https://github.com/barrel/mixitup/archive/v1.5.4.zip";

/* ====== PLUGINS & EXTENSIONS ====== */

/* --- EASING --- */

jQuery.extend(jQuery.easing,{
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	}
});

/* --- JQUERY TOUCHCLICK --- */

(function(e){var c,f,d,g;g=function(){return Math.round((new Date).getTime()/1E3)};c=function(a){var b=e(a.target),c=g(),d=b.data("touchclick-last-touch");d&&3>c-d&&"mousedown"===a.type?b.data("touchclick-disabled",!0):(b.data("touchclick-disabled",!1),b.addClass("touchactive"));("touchstart"===a.type||"MSPointerDown"===a.type)&&b.data("touchclick-last-touch",c)};f=function(a){a=e(a.target);a.data("touchclick-disabled",!0);a.removeClass("touchactive")};d=function(a){var b=e(a.target);b.data("touchclick-disabled")||
(a.type="touchclick",e.event.dispatch.call(this,a));b.data("touchclick-disabled",!1);b.removeClass("touchactive")};e.event.special.touchclick={setup:function(){var a=e(this);window.navigator.msPointerEnabled?(a.on("MSPointerDown",c),a.on("MSPointerUp",d)):(a.on("touchstart mousedown",c),a.on("touchmove mousemove",f),a.on("touchend mouseup",d))},teardown:function(){var a=e(this);window.navigator.msPointerEnabled?(a.off("MSPointerDown",c),a.off("MSPointerUp",d)):(a.off("touchstart mousedown",c),a.off("touchmove mousemove",
f),a.off("touchend mouseup",d))}}})(jQuery);

/* ====== EXTERNAL FUNCTIONS ====== */

/* IMAGE LOADING */

function imgLoaded(img){
	var src = img.attr('src');
	img.closest('.img_wrapper').css('background-image','url('+src+')').addClass('loaded');
}

/* ====== INTERNAL FUNCTIONS ====== */

/* SHARED VARS */

var firstrun = true,
	liveEffects = ['fade','scale'],
	liveEasing = 'smooth',
	liveSpeed = 500,
	touch = false,
	list = false,
	clickEv = 'click';



/* SANDBOX */

function mixSandBox(){
	
	// INSTANTIATE MIXITUP ON SANDBOX
	
	$('#SandBox').mixitup({
		buttonEvent: clickEv,
		onMixStart: function(config){
			
			// PAUSE LOGO ON SANDBOX ACTIVITY
			if(typeof timer != 'undefined'){
				clearInterval(timer);
			};
			if(typeof counter != 'undefined'){
				clearInterval(counter);
			};
			
			// UPDATE EFFECTS LIST
			config.effects = liveEffects;
			
			// UPDATE EASING
			config.easing = liveEasing;
			
			// UPDATE SPEED
			config.transitionSpeed = liveSpeed;
				
			return config;
		},
		onMixEnd: function(config){
			// AFTER 3 SECONDS OF NON-ACTIVITY, RESUME LOGO
			
			if(!touch){
				var i = 0;
				counter = setInterval(function(){
					i++;
					if(i == 2){
						mixLogo();
						clearInterval(counter);
					};
				},1000);
			};
			
			// ADD LIST STYING
			var wait = setTimeout(function(){
				if(config.layoutMode == 'list'){
					list = true;
					$('#SandBox .mix').addClass('full_width');
				};
			},100);
		}
	});
}

/* BACK TO TOP BUTTON */

function backToTop(){
	var ww = $(window).width();
	var bttMar = ((ww - 860) / 2) - 80;
	$('#BackToTop').css('right',bttMar+'px')	
}

/* GET REL X */

function getRelX(e, wrapper){
	if(touch) var e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	var parentOffset = wrapper.offset();
    var relX = (e.pageX - parentOffset.left);
	return relX;
};

/* ====== EVENT HANDLERS ====== */

function eventHandlers(){
	
	/* EFFECTS TOGGLING */
	
	$('.effect').bind(clickEv, function(){
		var effect = $(this).attr('data-effect');
		if(effect != 'fade'){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				liveEffects.splice(liveEffects.indexOf(effect), 1);
			} else {
				$(this).addClass('active');
				liveEffects.push(effect);
				// PREVENT CERTAIN 3D TRANSFORMS RUNNING WITH SCALE
				if((effect == 'rotateX' || effect == 'rotateY') && $('.effect[data-effect=scale]').hasClass('active')){
					$('.effect[data-effect=scale]').removeClass('active');
					liveEffects.splice(liveEffects.indexOf('scale'), 1);
				} else if(effect == 'scale'){
					if($('.effect[data-effect=rotateX]').hasClass('active')){
						liveEffects.splice(liveEffects.indexOf('rotateX'), 1);
						$('.effect[data-effect=rotateX]').removeClass('active');
					};
					if($('.effect[data-effect=rotateY]').hasClass('active')){
						liveEffects.splice(liveEffects.indexOf('rotateY'), 1);
						$('.effect[data-effect=rotateY]').removeClass('active');
					};
				};
			};
		};
	});
	
	/* EASING TOGGLING */
	
	$('.easing').bind(clickEv, function(){
		if(!$(this).hasClass('active')){
			$('.easing').removeClass('active');
			$(this).addClass('active');
			liveEasing = $(this).attr('data-easing');
		};
	});
	
	/* SCROLL TO TOP */
	
	$('#Logo, #BackToTop').bind(clickEv, function(e){
		history.pushState(null, null, ' ');
		$('html,body').animate({scrollTop: 0}, 700);
	});
	
	/* SCROLL TO ANCHOR LINKS */
	
	$('a.scroller').bind(clickEv, function(e){
		$t = $(this);
		var buffer = 68;
		e.preventDefault();
		sectionId = $t.attr('href');
		$('body').removeClass('expand');
		history.pushState(null, null, sectionId);
		$('#Options').find('aside').removeClass('expanded').find('.content').hide();
		$('html,body').animate({scrollTop: $(sectionId).offset().top - buffer}, 600, 'easeOutQuad',function(){
			if($t.hasClass('exp')){
				$(sectionId).closest('aside').addClass('expanded').find('.content').slideDown();
			};
		});
	});
	
	/* EXPAND OPTIONS DETAILS */
	
	$('#Options').find('.toggle').bind('click',function(){
		if(!$(this).closest('aside').hasClass('expanded')){
			$(this).closest('aside').find('.content').slideDown(function(){
				$(this).closest('aside').addClass('expanded');
			});
		} else {
			$(this).closest('aside').removeClass('expanded').find('.content').hide();
		};
	})
	
	/* EXPAND MOBILE HEADER */
	
	$('#NavToggle').bind(clickEv, function(e){
		if(!$('body').hasClass('expand')){
			$('body').addClass('expand');
		} else {
			$('body').removeClass('expand');
		};
	})
	
	/* GRID/LIST */
	
	$('#GoList').bind(clickEv, function(e){
		$('.button.layout').removeClass('active');
		$(this).addClass('active');
		$('#SandBox').mixitup('toList');
	});
	
	$('#GoGrid').bind(clickEv, function(e){
		if(list){
			$('.button.layout').removeClass('active');
			$(this).addClass('active');
			var delay = setTimeout(function(){
				$('#SandBox .mix').removeClass('full_width');
				$('#SandBox').mixitup('toGrid');
			});
		};
	});
	
	/* SPEED SLIDER */
	
	var drag = false;
	
	$('#SpeedSlider .scrubber').bind('mousedown',function(e){
		e.originalEvent.preventDefault();
		drag = true;
	});
	
	$('#SpeedSlider .scrubber').bind('touchstart',function(e){
		e.preventDefault();
		drag = true;
	});
	
	$('body').bind('mouseup',function(){
		drag = false;
	});
	
	$('body').bind('touchend',function(){
		drag = false;
	});
	
	$('#SpeedSlider').bind('click',function(e){
		getSpeed(e);
	});
	
	$('body').bind('mousemove',function(e){
		if(drag){
			getSpeed(e);
		};
	});
	
	$('body').bind('touchmove',function(e){
		if(drag){
			e.preventDefault();
			getSpeed(e);
		};
	});
	
	function getSpeed(e){
		var relX = getRelX(e, $('#SpeedSlider .slide'));
		var slidew = $('#SpeedSlider .slide').width();
		if (relX >= 0 && relX <= slidew){
			liveSpeed = 1000 - (1000 * (relX / slidew)).toFixed();
			$('#SpeedSlider .scrubber').css('left',relX+'px')
				.find('div').attr('data-speed',liveSpeed+'ms');
		};
	};
	
	/* CONVERSION MODAL */
	
	var $convert = $('#Convert'),
		$form = $convert.find('form');
		$input = $convert.find('input[name=email]');
	
	$('.modal_trigger').bind('click', function(){
		$convert.fadeIn();
		// TRACK EVENT
		if(typeof _gaq != "undefined"){
			_gaq.push(['_trackEvent', 'Downloads', 'Plugin Only', 'Plugin Download']);
		};
		var delay = setTimeout(function(){
			window.location = latest;
		},3000);
	});
	
	$convert.find('.close').bind('click',function(){
		$convert.fadeOut().find('input').val('');
	});
	
	$('#Submit').bind('click',function(){
		var value = $input.val(),
			error = false,
			$errors = $('#Errors');
			
		if (!value.length){
			error = true;
			$errors.html('<p>Please enter an email address</p>')
		} else if(value.length && (value.indexOf('@') == -1 || value.indexOf('.') == -1)){
			error = true;
			$errors.html('<p>Please enter a valid email address</p>')
		};
		
		if(error){
			return false;
		} else {
			$errors.empty();
		};
		
		//ajax submit
		var action = 'http://barrelny.us1.list-manage.com/subscribe/post-json?u=b075be5b166b58f7abfca70eb&id=eff6e2decc&email='+value;
		var formData = $form.serializeArray();
		
		$.ajax({
			type: "POST",
			url: 'subscribe.php',
			data: {
				email: value
			},
			success: function(data){
				if (data.result == 'success'){
					$convert.fadeOut().find('input').val('');
				} else {
					$errors.html('<p>'+data.msg.substring(3)+'</p>')
				};
			},
			dataType: 'json'
		});
		
		
		
		
	});
}

/* ====== ON RESIZE ====== */

$(window).resize(function(e){
	
	/* POSITION BACK TO TOP BUTTON */
	
	backToTop();
	
	/* GALLERY HEIGHT */
	
	$('#Gallery').css('min-height',$(window).height()-316);
	
});

/* ====== ON SCROLL ====== */

$(window).scroll(function(e){
	
	if(!touch){
		var scrollPos = $(window).scrollTop();
	
		// STICKY HEADER 
	
		if(scrollPos >= $('#SandBox').outerHeight() - 68){
			$('body').addClass('fixed');
			$('#ResizeMe').fadeOut();
			if(!$('.touch').length){
				$('#BackToTop').fadeIn();
			};
		} else {
			$('body').removeClass('fixed');
			if(!$('.touch').length){
				$('#ResizeMe').fadeIn();
			};
			$('#BackToTop').fadeOut();
		};
	
	
		// IN VIEW ACTIVE HEADER LINKS
	
		if(scrollPos >= $('#WhatIsIt').offset().top -68 && scrollPos < $('#Demos').offset().top -68){
			$('header nav span').removeClass('active');
			$('header nav li:nth-of-type(1) span').addClass('active');
		} else if(scrollPos >= $('#Demos').offset().top -68 && scrollPos < $('#Documentation').offset().top -68){
			$('header nav span').removeClass('active');
			$('header nav li:nth-of-type(2) span').addClass('active');
		} else if(scrollPos >= $('#Documentation').offset().top -68 && scrollPos < $('#Gallery').offset().top -68){
			$('header nav span').removeClass('active');
			$('header nav li:nth-of-type(3) span').addClass('active');
		} else if(scrollPos >= $('#Gallery').offset().top -68){
			$('header nav span').removeClass('active');
			$('header nav li:nth-of-type(4) span').addClass('active');
		} else {
			$('header nav span').removeClass('active');
		};
		
		// LEARN MORE MENU
		
		if((scrollPos >= $('#Options').offset().top - 50) && (scrollPos < $('#Faqs').offset().top - $('#LearnMore').outerHeight() - 100)){
			$('#LearnMore').addClass('fixed').removeClass('bottom');
		} else if(scrollPos >= $('#Faqs').offset().top - $('#LearnMore').outerHeight() - 100){
			$('#LearnMore').removeClass('fixed').addClass('bottom');
		} else {
			$('#LearnMore').removeClass('fixed').removeClass('bottom');
		};
	};
});

/* ====== ON DOCU READY ====== */

$(function(){
	
	/* DETECT PLATFORM */
	
	$.support.touch = 'ontouchend' in document;

	if ($.support.touch) {
		touch = true;
		$('body').addClass('touch');
		clickEv = 'touchclick';
	};
	
	/* POSITION BACK TO TOP BUTTON */
	
	backToTop();
	
	/* INSTANTIATE LOGO */
	
	if(!touch){
		mixLogo();
	};
	
	/* INSTANTIATE SANDBOX */
	
	mixSandBox();
	
	/* EVENT HANDLERS */
	
	eventHandlers();
	
	/* SYNTAX HIGHLIGHTER */
	
	SyntaxHighlighter.all();
	
	/* GALLERY HEIGHT */
	
	$('#Gallery').css('min-height',$(window).height()-316);
	
});