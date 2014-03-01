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