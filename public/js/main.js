(function($) {
  //VARIABLES
  var counter = 1;
  var css_class = 1;
  var delay = 0;
//

$('#add').on('click', function() {
    //after 4 divs : make tabs
    if (++counter >= 5){
      var w = $('#container').width()/4 + 15;
      console.log(w);
      console.log("too wide !");

    }
    (counter < 5) ? css_class = counter : css_class = "tab";
    (counter < 5) ? $('#container').width(50+(counter * 10)+"%") : $('#container').width("90%");
    console.log("adding a div: delay" + delay);

// var newdiv = $('#template').clone().appendTo('#container');
// newdiv.attr("id", counter);
// newdiv.show();

// setTimeout(function() {
  var newdiv = $('#template').clone();
  newdiv.attr("id", counter);
  newdiv.addClass("div"+css_class).appendTo('#container');
  newdiv.show();
// }, 10);

    //modify each content div
    $('#container').children('div:not(:first)').each(function(){

      $(this).removeClass().addClass("div"+css_class);
      
    });
    if (counter >= 5) {
     for (i = 1; i <= counter - 4; i++) {
       $('#'+i).removeClass().addClass("divtabhidden");
       var tab = $(".tab_template").clone();
       tab.removeAttr("id");
       tab.children("a").text(i);
       tab.show();
       tab.appendTo('#tab_container');
     }

   }
  }); //END ADD click

   //remove a search 
   $('#container').on('click', '.tweet_remove', function() {

     $(this).killTime('filling');
     if (counter == 1) {
      //empty title
      $(this).parent().next().html('');
      console.log("first div");
    }

    else {
      if (counter == 2)
        $('#container').width("50%") ;

      $(this).parent().parent().remove();
//       if (counter < 5) { //no tabs yet
 counter--;

  //reaffect ID's so that we can delete any div
  var i = 1;
  $('#container').children('div:not(:first)').each(function(){
    $(this).removeClass().addClass("div"+counter);
    $(this).attr("id", i);
    i++;

  });
}
});

  // MAIN
  $(function() {
    //init container
    $('#container').width("50%");
    var first_div = $('#template').clone();
    first_div.attr("id", "1");
    first_div.appendTo('#container');
    $('#template').hide();
    $('.tab_template').hide();
    

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
    $(".tab").click(function(e) {
      e.preventDefault();

      $("#tab_container").animate({ left: sipPos }, 800, 'linear', function() {
        if(sipPos == 0) { sipPos = -100; }
        else { sipPos = 0; }
      });
  });//END slide panel
    $('input[type="submit"]').val('M');
  });//END main
})(jQuery);










