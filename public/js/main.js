(function($) {
  var counter = 1;
  var css_class = 1;
  $('#add').on('click', function() {
    //after 4 divs : make tabs
    if (++counter >= 5){
      var w = $('.div4').width()+15;
      console.log(w);
      console.log("too wide !");
      //animate divs through the left
      //$('#container').children('div:(first))').animate({
  //      $('#container').children('div:(:first)').animate({
  //       left: '-='+w,
  //     }, 1, function() {
  //   // Animation complete.
  // });
     // $('#container').hide("slide", { direction: "left" }, 1000);
   }
   (counter < 5) ? css_class = counter : css_class = 4;
   (counter < 5) ? $('#container').width(50+(counter * 10)+"%") : $('#container').width($('#container').width() + w)
  console.log("adding a div: " + $('#container').width());
    // enlarge container 10% more
    $('#container').width(50+(counter * 10)+"%");
  
    //appendinga new div
//     setInterval(function() {
//       console.log("wait");
// }, 2000);
// setTimeout(function() {
var newdiv = $('#template').clone().appendTo('#container');
newdiv.show();
// }, 2000);
    // var newdiv = $('#template').clone().appendTo('#container');
    // newdiv.show();
    //modify each content div
    $('#container').children('div:not(:first)').each(function(){
      $(this).removeClass().addClass("div"+css_class);
      console.log("removed class");
    });
    
  });

  // MAIN
  $(function() {
    //init container
    $('#container').width("50%");
    $('#template').clone().appendTo('#container');
    $('#template').hide();
//end init container

//
  $('.tweet').click(function(event) {
  console.log("hello "+ $(this).html());
});
//
//submit button
$('#container').on('click', '.search', function() {
  var to_search = $(this).prev().val();

  //displaying search title
  $(this).parent().next().html($(this).prev().val());

  console.log("searching tweets about "+ $(this).prev().val()); 
  //empty input text
  $(this).prev().val('');

  var that = this;
  
  //replace '#''
  to_search = to_search.replace('#', '%23');

  //first call launches timers, others kills before new search
   if ($(this).attr("name") == 'start')
    $(this).attr("name", "stop");
  else {
   $(this).killTime('filling');
   $(this).parent().next().next().html("");
 }
 //first call
 retrieve_data(to_search, that);
//update call
$(this).everyTime(15000, 'filling', function() {
  retrieve_data(to_search, that);
});  
});
 //END submit button

 //ajax call to retrieve the tweets
 function retrieve_data(to_search, that){
  var my_data;
  $.ajax({
    url:  '/search/',
    data: 'exp='+ to_search,
    type:       'GET',
    dataType: "json",
       success: function(data) {
        console.log("OK");
       //appending to the div
        $(that).parent().next().next().prepend(data);  
        return data;

      },
      error : function(data){
        console.log("error");
      }
    });
}

//DELEGATE
$("#container").delegate('.tweet', 'click', function(event) {
    var that = this;
    $(this).children(".tweet_details").toggle('fast', function() {
    // Animation complete.
  });
    console.log("delegate"+$(this).children(".tweet_content").attr("display"));
  });
//
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










