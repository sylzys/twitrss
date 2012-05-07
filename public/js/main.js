(function($) {
  var counter = 1;
  $('#add').on('click', function() {
    //after 4 divs : make tabs
    if (++counter >= 5){
      var w = $('.div4').width();
      console.log(w);
      console.log("too wide !");
      //animate divs through the left
      $('#container').children('div:(first))').animate({
       // $('#container').children('div:not(:first)').each(function(){
        left: '-='+w,
      }, 2000, function() {
    // Animation complete.
  });
    
   }

  console.log("adding a div: " + counter);
    // enlarge container 10% more
    $('#container').delay(2100).width(50+(counter * 10)+"%");
    //appendinga new div
    var newdiv = $('#template').clone().appendTo('#container');
    newdiv.show();
    //modify each content div
    $('#container').children('div:not(:first)').each(function(){
      $(this).removeClass('div1', 'div2', 'div3', 'div4').addClass("div"+counter);

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
  $('.div1').click(function(event) {
  var to_search = $(this).prev().val();
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
$(this).everyTime(5000, 'filling', function() {
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
$("#tweet").delegate('#tweet_content a', 'click', function(event) {
    var that = this;
    console.log("delegate");
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










