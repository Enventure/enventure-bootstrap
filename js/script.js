/* -------------------- todo UI --------------------- */
$(document).ready(function() {
    // Todo list
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
    });
	
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

//clickable divs
$(".clickMe").click(function(){
     myWindow=window.open($(this).find("a").attr("href"),'_blank'); 
     return false;
});

var button = $('#toggle');
button.on('click', function () {
  $(this).toggleClass('active');
});

var button = $('#toggle2');
button.on('click', function () {
  $(this).toggleClass('active');
});

var button = $('#toggle3');
button.on('click', function () {
  $(this).toggleClass('active');
});

var button = $('#toggle4');
button.on('click', function () {
  $(this).toggleClass('active');
});

$(':radio').radio();