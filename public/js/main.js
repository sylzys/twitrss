(function($) {
  var counter = 1;
//  $('#add').click(function(event) {
  $('#add').on('click', function() {
    if (++counter >= 5){
      var w = $('.div4').width();
      console.log(w);
      console.log("too wide !");
      // $('#container').children(3).hide();
      $('#container').children('div:(first))').animate({
       // $('#container').children('div:not(:first)').each(function(){
        left: '-='+w,
      }, 2000, function() {
    // Animation complete.
  });
     // setTimeOut(function() { hello();}, 2010);
    }
// else {
  console.log("adding a div: " + counter);
    // enlarge container 10% more
    // $('#container').sleep(2500);
    $('#container').delay(2100).width(50+(counter * 10)+"%");
    //appendinga new div
    var newdiv = $('#template').clone().appendTo('#container');
    newdiv.append("div"+counter);
    newdiv.show();
    //modify each content div
    $('#container').children('div:not(:first)').each(function(){
      $(this).removeClass('div1', 'div2', 'div3', 'div4').addClass("div"+counter);

    });
    
});

  // MAIN
  $(function() {
    $('#container').width("50%");
    $('#template').clone().appendTo('#container');
    $('#template').hide();

//submit button
$('#container').on('click', '.search', function() {
  var to_search = $(this).prev().val();
  $(this).parent().next().html($(this).prev().val());
  console.log("adding a twit from"+ $(this).prev().val()); 
   var that = this;
  $(this).everyTime(5000, function() {
    $.ajax({
      url:  '/search/',
        data: 'exp='+ to_search,
        type:       'GET',
        dataType: "json",
       // jsonpCallback: "parse_res",
        success: function(data) {
          console.log("OK");
          console.log(data);
         $(that).parent().next().next().prepend(data);  
          
        },
        error : function(data){
          console.log("error");
          console.log(data);
        }
      });
    
    console.log("hello");
  });  
});
 //END submit button

    //slide panel
    var sipPos = 0;
    $("#paneltab").click(function(e) {
      e.preventDefault();
      $("#panel").animate({ left: sipPos }, 800, 'linear', function() {
        if(sipPos == 0) { sipPos = -100; }
        else { sipPos = 0; }
      });
  });//END slide panel

  });//END main
})(jQuery);










