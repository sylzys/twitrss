(function($) {
  //VARIABLES
  var counter = 1;
  var css_class = 1;
  var delay = 0;
  var tab_l = 0;
  var tab_r = 0;
  var w = 0;

  //add button
  $('#add_btn').on('click', function() {
    //div counter increment
    counter++;
    (counter <= 5) ? css_class = counter : css_class = "5";
    //modifying each div class to fetch new size
    $('#container').children('div').each(function(){
      $(this).removeClass().addClass("div"+css_class);
    });
    //cloning and appending a new div
    var newdiv = $('#template').clone();
    newdiv.attr("id", counter);
    newdiv.removeClass().addClass("div"+css_class).appendTo('#container');
    //if less than 5 divs
    if (counter < 5){
      $('#container').width(60+(counter * 10)+"%");
    }
    //5 divs and more
    else {
      //one more tab on the left
      tab_l++;
      //show left arrow
      $("#prev").show();
      $('#container').removeAttr('margin');
      //splitting wrapper in 4 parts to get a div size
      w = $('#wrapper').width() / 4;
      console.log(w);
      //adjusting every div size
      $('.div5').width(w);
      //adjusting container size to fetch all divs
      $('#container').width(w * counter);
      //slide container to the left
      $('#container').animate({
        marginLeft: '-='+w,
      }, 1000, function() {
      });
    }
    //sjow new div
    newdiv.show();
  }); //END ADD button

   //remove a search 
   $('#container').on('click', '.tweet_remove', function() {
    //stop the current search timer
    $(this).killTime('filling');
     //don't delete if only one div left
     if (counter == 1) {
      $(this).parent().next().html('');
      console.log("first div");
    }
    else {
      //not the only div left
      if (counter == 2)
        $('#container').width("50%") ;
      //remove the div
      $(this).parent().parent().remove();
      counter--;

  //reaffect ID's so that we can delete any div
  var i = 1;
  //reaffect div size
  $('#container').children('div').each(function(){
    $(this).removeClass().addClass("div"+css_class);
    $(this).attr("id", i);
    i++;

  });
}
});

  // MAIN
  $(function() {
    //init container and hide divs
    $('#container').width("50%");
    var first_div = $('#template').clone();
    first_div.attr("id", "1");
    first_div.appendTo('#container');
    $('#template').hide();
    $('#next').hide();
    $('#prev').hide();
    

//end init container


//submit button
$('#container').on('click', '.search', function() {
  var to_search = $(this).prev().val();

  //displaying search title
  $(this).parent().next().html($(this).prev().val());

  //empty input text
  $(this).prev().val('');
  var that = this;  
  //replace '#'
  to_search = to_search.replace('#', '%23');

  //first call launches timers, kill others before new search
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

    //next button click
    $('#next_btn').click(function(event) {
      //decrement tab number on the right if not zero
      if (tab_r != 0) {
        tab_r--;
        if (counter >=5) { //if more than 5 divs, there's one more on the left
          tab_l++;
        $("#prev").show();
      }
        //slide container
        $('#container').animate({
          marginLeft: '-='+w,
        }, 1000, function() {
        });
      }
      //no more divs on the right, hide next button
      if (tab_r == 0) 
        $("#next").hide();
    }); //end Next button click

    //prev button click
    $('#prev_btn').click(function(event) {
      if (tab_l != 0) {
        tab_l--;
        if (counter >=5) {
          tab_r++;
          $("#next").show();
        }
        $('#container').animate({
          marginLeft: '+='+w,
        }, 1000, function() {
        });
      }
      if (tab_l == 0)
        $("#prev").hide();
    });//END prev button click
    $('input[type="submit"]').val('M');
  });//END main
})(jQuery);










