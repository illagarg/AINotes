$(document).ready(function(){
	
$("body").append('<div id="eyeTrackerBtns"><div id="box"><label for="colorPicker">Color Box:</label><input type="color" value="#8888ff" id="colorPicker"><p id="output"></p></div><div class="text"><button type="button" id="savingText">Save Notes</button></div><div class="speakButton"><a href="#" id="speak" class="waves-effect waves-light btn">Audio Notes</a></div><div class="play_button"><button onclick="playAud()" type="button" > Read % </button><audio id="myAudio"><source src="textread.mp3" type="audio/mp3">Your browser doesnot support HTML5 audio.</audio></div><div class="r_speed_button"><div class="main_area1"><button onclick="changeFontSize(button1)" type="button" id="button1" > Level 1 </button></div><div class="main_area2"><button onclick="changeFontSize(button2)" type="button" id="button2" > Level 2 </button></div><div class="main_area3"><button onclick="changeFontSize(button3)" type="button" id="button3" > Level 3 </button></div></div></div>');

var aud = document.getElementById("myAudio");
function playAud() {
	aud.play();
}
function pauseAud() {
	aud.pause();
}

var storingInArray = [];
    $('p').each(function(){
            var text   = $(this).html().split( /\s+/ ),
                len    = text.length,
                result = []; 

            for( var i = 0; i < len; i++ ) 
              result[i]= '<span class="overlay" id = "text'+ i + '">' + text[i] + '</span>';
            $(this).html(result.join(' '));
    });  
  	
  	$( '.overlay' ).each( function( index, element ){   
          $( this ).eyeIn(
            function() {
            	var Item = this.$element;
            	// Item.css('background', 'yellow');
            	// console.log("Inside eyeIn")
              // var oldcolorPicker = colorPicker();
            	window.addEventListener("keypress", (function (event) {
            		var keyNum = event.which;
            		if (keyNum == "32"){
                  event.preventDefault();
                  // console.log("If block");
                  Item.css('background', colorPicker());
                  storingInArray.push(Item.text());
                  console.log(storingInArray);
                }
                else {
                  event.preventDefault();
                  // console.log("Else block");
                  Item.css('background', 'transparent');
                }
              }).bind(this), false);
          }, 10);

          // $( this ).eyeOut(
          //   function() {
          //     Item.css('background', this.oldcolorPicker);     
          //   },10);

    });	
    
    function colorPicker(){

      let colorPicker = document.getElementById("colorPicker");
      let box = document.getElementById("box");
      let output = document.getElementById("output");

      box.style.borderColor = colorPicker.value;

      colorPicker.addEventListener("input", function(event) {
        box.click();
        event.preventDefault();
        box.style.borderColor = event.target.value;
      }, false);

      colorPicker.addEventListener("change", function(event) {
        box.click();
        event.preventDefault();
        box.style.borderColor = colorPicker.value;
      }, false);

      return colorPicker.value;
    
    }

    $( '.play_button' ).eyeIn( function() {
        // window.addEventListener("keypress", (function (event) {
        //   var keyNum = event.which;
        //   if (keyNum == "32"){
            // event.preventDefault();
            playAud();
        //   }
        //   else {
        //     event.preventDefault();
        //     pauseAud();
        //   }
        // }), false);
    }, 2);

    $( '.play_button' ).eyeOut( function() {
            // event.preventDefault();
            pauseAud();   
    },5);

    $( '#box' ).eyeIn( function()

    {
      if ($('#box').click()){
        var colourPicker = colorPicker();
      }
    }, 10);
      
    //     window.addEventListener("keypress", (function (event) {
    //             var keyNum = event.which;
    //             if (keyNum == "32"){
    //               event.preventDefault();
    //               console.log("If block");
    //               var colourPicker = colorPicker();
    //               // colourPicker.box.click();
    //             }
    //             else {
    //               event.preventDefault();
    //               console.log("Else block");
    //               // Item.css('background', 'transparent');
    //             }
    //           }), false);

    // }, 2);

 $( "a[class='resource']" ).eyeIn(function()
   {
      window.addEventListener("keypress", (function (event) {
          var keyNum = event.which;
          if (keyNum == "32"){
            newPopup();
          }
        }), false);    
    }, 10);

  $('.r_speed_button').eyeIn(function()
    {
      if($('#button1').click()){
        changeFontSize(this);}
      // } elseif($('#button2').click()){
      //   event.preventDefault();
      //   changeFontSize(this);
      // } elseif($('#button3').click()){
      //   event.preventDefault();
      //   changeFontSize(this);
      // }
      // window.addEventListener("keypress", (function (event) {
      //   var keyNum = event.which;
      //   if (keyNum == "32"){
      //     changeFontSize(this);
      //   }
          // else {
            
          // }
      // }), false);
   }, 2);

$('.text').eyeIn(function()
  {
    if($('#savingText').click()){
      saveDynamicDataToFile(storingInArray);
    }
  }, 2);

$('.speakButton').eyeIn(function()
{
  if($('#speak').click()){
    speech(storingInArray);
  }
}, 2);

});
