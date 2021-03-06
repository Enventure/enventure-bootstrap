/* -------------------- todo UI --------------------- */



$(document).ready(function() {
    // Todo list
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
    });
	
});


/* -------------------- Isotope --------------------- */

$(function(){
	
	var $container = $('#container');
	
	$container.isotope({
        itemSelector : '.element',
		  getSortData : {
			  symbol : function( $elem ) {
				  return $elem.attr('data-symbol');
			  },
			  category : function( $elem ) {
				  return $elem.attr('data-category');
			  },
			  number : function( $elem ) {
				  return parseInt( $elem.find('.number').text(), 10 );
			  },
			  weight : function( $elem ) {
				  return parseFloat( $elem.find('.weight').text().replace( /[\(\)]/g, '') );
			  },
			  name : function ( $elem ) {
				  return $elem.find('.name').text();
			  }
		  }
      });
		
		
		var $optionSets = $('#options .option-set'),
			$optionLinks = $optionSets.find('a');
		
		$optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
				return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
			
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
				// changes in layout modes need extra logic
				changeLayoutMode( $this, options )
			} else {
				// otherwise, apply new options
				$container.isotope( options );
			}
			
			return false;
		});
		
		
    });



/* -------------------- Tweet --------------------- */

jQuery(function($){
	$(".tweet").tweet({
		username: "enventuremed",
		join_text: "auto",
		avatar_size: 36,
		count: 2,
		/*
auto_join_text_default: "we said,",
auto_join_text_ed: "we",
auto_join_text_ing: "we were",
auto_join_text_reply: "we replied to",
auto_join_text_url: "we were checking out",
*/
            loading_text: "loading tweets..."
        });
    });




/* -------------------- Slider --------------------- */

$(function() {
	
	var Page = (function() {
		
		var $navArrows = $( '#nav-arrows' ),
            $nav = $( '#nav-dots > span' ),
			  slitslider = $( '#slider' ).slitslider( {
				  onBeforeChange : function( slide, pos ) {
					  
					  $nav.removeClass( 'nav-dot-current' );
					  $nav.eq( pos ).addClass( 'nav-dot-current' );
					  
				  }
			  } ),
			  
			  init = function() {
				  
				  initEvents();
				  
			  },
			  initEvents = function() {
				  
				  // add navigation events
				  $navArrows.children( ':last' ).on( 'click', function() {
					  
					  slitslider.next();
					  return false;
					  
				  } );
				  
				  $navArrows.children( ':first' ).on( 'click', function() {
					  
					  slitslider.previous();
					  return false;
					  
				  } );
				  
				  $nav.each( function( i ) {
					  
					  $( this ).on( 'click', function( event ) {
						  
						  var $dot = $( this );
						  
						  if( !slitslider.isActive() ) {
							  
							  $nav.removeClass( 'nav-dot-current' );
							  $dot.addClass( 'nav-dot-current' );
							  
						  }
						  
						  slitslider.jump( i + 1 );
						  return false;
						  
					  } );
					  
				  } );
				  
			  };
			
            return { init : init };
			
        })();
		  
		  Page.init();
		  
      });

/* meetup widget */

var mup_widget = {
    with_jquery: function(block) {
        block(jQuery, document.body);
    },
    api_call: function(path, params) {
        return "http://api.meetup.com" + path + "?callback=?&" + jQuery.param(jQuery.extend({ key: $api_key }, params));
    }
};

/* smooth scroll*/
/*
!function ($) {
$('a[href^="#"]').bind('click.smoothscroll',function (e) {
e.preventDefault();
var target = this.hash;
$target = $(target);
$('html, body').stop().animate({
'scrollTop': $target.offset().top
}, 500, 'swing', function () {
window.location.hash = target;
});
});
}(window.jQuery)
/

/*scrollspy call*/

$('a[href^="#"]:not([data-slide])').bind('click', function(e) {
	e.preventDefault();
	$('html, body').animate({ scrollTop: $(this.hash).offset().top }, 600);
	
	// edit: Opera requires the "html" elm. animated
});



// add the scroll event listener
if (window.addEventListener){
  window.addEventListener('scroll', handleScroll, false);
}else{
  window.attachEvent('onscroll', handleScroll);
}

//clickable divs
$(".clickMe").click(function(){
     myWindow=window.open($(this).find("a").attr("href"),'_blank'); 
     return false;
});