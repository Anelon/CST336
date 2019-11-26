/*global $*/
$(document).ready(function(){
    $(".fav").on("click", function(){
        //alert("faved");
        if($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "img/fav_on.png");
            alert($(this).prev().attr("src"));
        } else {
            $(this).attr("src", "img/fav_off.png");
        }
    });
});