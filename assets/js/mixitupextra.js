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
	
	
		
		
		
}




/* ====== ON DOCU READY ====== */

$(function(){
	
	/* DETECT PLATFORM */
	
	$.support.touch = 'ontouchend' in document;

	if ($.support.touch) {
		touch = true;
		$('body').addClass('touch');
		clickEv = 'touchclick';
	};
	
	
	
	/* INSTANTIATE SANDBOX */
	
	mixSandBox();
	
	
	
	/* GALLERY HEIGHT */
	
	$('#Gallery').css('min-height',$(window).height()-316);
	
});