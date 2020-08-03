
//INDEX UnicornDab animation
$(document).ready(function() {

    function ImgLeft() {
        $("#unicornDab").animate({left: "-0%"}, 1500, "swing", ImgRight);
    }
    function ImgRight() {
        $("#unicornDab").animate({left: "+85%"}, 1500, "swing", ImgLeft);
    }

ImgRight();

});


//ABOUT text jquery chain.
$(window).load(function() {
    $('#spark').css({'color':'pink'}).fadeOut(3000);
    $('#spark').fadeIn(3000);
   
        
});


//PRODUCT Page drop down panel
$(document).ready(function(){
    $("#dropDown").click(function(){
      $("#dropDownPanel").slideToggle("slow");
    });
});
