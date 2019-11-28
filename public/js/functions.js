/*global $*/
function updateFav(imageURL, keyword, insert) {
    $.ajax({
        method: "get",
        url: "/api/updateFav",
        data: {"imageURL": imageURL, 
        "keyword": keyword, 
        "insert": insert
        }
    });
}


$(document).ready(function(){
    $(".fav").on("click", function(){
        //alert("faved");
        let imgUrl = $(this).prev().attr("src");
        if($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "img/fav_on.png");
            updateFav(imgUrl,$("#keyword").val(), "insert"); //inserts
        } else {
            $(this).attr("src", "img/fav_off.png");
            updateFav(imgUrl,$("#keyword").val(), "delete"); //delete
        }
    });
    
    
    $(".keywordlink").on("click", function(){
        let keyword = $(this).text().trim();
        //alert(keyword);
        $.ajax({
            method: "get",
            url: "/api/getFav",
            data: {"keyword": keyword},
            success: function (rows,status) {
                $("favorites").html("");
                rows.forEach(function(row) {
                    let img = `<img class='img' src='${row.url}' height='200'>`
                    let like = "<img class='fav' src='img/fav_on.png' width='20'>";
                    $("favorites").append("<card>" + img + like + "</card>");
                });
                $(".fav").on("click", function(){
                    //alert("faved");
                    let imgUrl = $(this).prev().attr("src");
                    if($(this).attr("src") == "img/fav_off.png") {
                        $(this).attr("src", "img/fav_on.png");
                        updateFav(imgUrl,$("#keyword").val(), "insert"); //inserts
                    } else {
                        $(this).attr("src", "img/fav_off.png");
                        updateFav(imgUrl,$("#keyword").val(), "delete"); //delete
                    }
                });
            }
        });
    });
});