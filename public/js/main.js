(function($) {
var counter = 1;
 $('#add').click(function(event) {
  if (++counter < 5){
    console.log("adding a div: " + counter);
    // enlarge container 10% more
    $('#container').width(50+(counter * 10)+"%");
    //appendinga new div
    var newdiv = $('#template').clone().appendTo('#container');
    newdiv.append("div2");
    newdiv.show();
    //modify each content div
    $('#container').children('div:not(:first)').each(function(){
        $(this).removeClass('div1', 'div2', 'div3', 'div4').addClass("div"+counter);
        
      });
    $.ajax({
        url:  'http://search.twitter.com/search.json?q=twitterapi',
        //data: 'twitterapi',
        type:       'GET',
        dataType: "jsonp",
        jsonpCallback: "parse_res",
        success: function(data) {
          console.log(data);
        },
        error : function(data){
            console.log(data);
        }
    });
  }
  else 
    console.log("too wide !");
});
  // MAIN
  $(function() {
    $('#container').width("50%");
    
    $('#template').clone().appendTo('#container');
    $('#template').hide();
  });
})(jQuery);










