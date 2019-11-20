  var storingInArray = []; // Created to store the highlighted keywords only. Created outside to support SpeechSynthesisAPI.
  var readWordsInArray = []; // Created to store the keywords you are gazing at.

  $(document).ready(function(){
  // This is to create this file as a Plugin.
  $("body").append('<div id="eyeTrackerBtns"><div id="box"><label for="colorPicker">COLOR BOX:</label><input type="color" value="#8888ff" id="colorPicker"><p id="output"></p></div><div class="text"><button type="button" id="savingText">SAVE NOTES</button></div><div class="container"><form class="col s12 offset-s2"><div class="row" style="align-self: right"><div class="select-wrapper"><select id="voices" class="initialized"><option value="0">Microsoft David Desktop - English (United States) (default)</option><option value="1">Microsoft Zira Desktop - English (United States)</option><option value="2">Google Deutsch</option></select></div></div><div class="speakButton"><a href="javascript:void(0);" id="speak" class="waves-effect waves-light btn">Audio Notes</a></div></form></div><div id="modal1" class="modal"><h4> Speech Synthesis not supported </h4><p> Your browser does not support speech synthesis. </p><p> We recommend you use Google Chrome. </p><div class="action-bar"><a href="#" class="waves-effect waves-green btn-flat modal-action modal-close"> Close </a></div></div><div class="r_speed_button"><button type="button" id="button1" > LARGE FONT </button></div><div class="r_speed_button2"><button type="button" id="button2" > SMALL FONT </button></div><button id="readingSpeed"> INDENTING </button><button id="readingSpeedOut"> UNINDENTING </button><div id="timer"></div><button id="speedChecker"> READING SPEED CHECKER </button> <button id="analysis"> COMPARISON </button> </div>');
      // Splitting the paragraph text in words.
      $('p').each(function(){
              var text   = $(this).html().split( /\s+/ ),
                  len    = text.length,
                  result = []; 

              for( var i = 0; i < len; i++ ) 
                result[i]= '<span class="overlay" id = "text'+ i + '">' + text[i] + '</span>';
              $(this).html(result.join(' '));
      });

      // Following variables have been created to support reading speed features.
      var isPaused = false;
      var time = new Date();
      var offset = 0;
      var milisec = 0;

    	$( '.overlay' ).each( function( index, element ){   
        $( this ).eyeIn(
          function() {
          	var Item = this.$element;
            var t = setInterval(function(){
              if(isPaused){
                milisec = offset + (new Date()).getTime() - time.getTime();
              $('div#timer').text(parseInt(milisec / 1000) + "s " + (milisec % 1000) + "ms");
              $('#timer').addClass('stick'); // This is to create the Indenting effect on web page.
              }
            }, 10);

            isPaused = true;
            readWordsInArray.push(Item.text);
            offset += (new Date()).getTime() - time.getTime();
            
           	window.addEventListener("keypress", (function (event) {
            	var keyNum = event.which;
            	if (keyNum == "32"){
                event.preventDefault();
                // console.log("If block");

                Item.css('background', colorPicker());
                Array.from(new Set(storingInArray));
                storingInArray.push(Item.text());
                console.log(storingInArray);
              }
              else {
                event.preventDefault();
                // console.log("Else block");
                Item.css('background', 'transparent');
                storingInArray = [];
              }
            }).bind(this), false);
        }, 10);

        $( this ).eyeOut(
          function() { 
            isPaused = false;
            time = new Date();
            // $('div#timer').text("");
            // console.log("In eyeout");
            // clearInterval(id);     
          },10);

      }); 
    
    // var j = 0;
    // function timedText(){
    //   j = j + 1;
    //   document.getElementById("timer").innerHTML = j + "seconds";
    //   var fin = j;
    // }

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

  $('.r_speed_button').eyeIn(function()
      {
        if($('#button1').click()){
          var target = document.getElementById("button1");
          changeFontSize(target);}      
    }, 2);

  $('.r_speed_button2').eyeIn(function()
      {
        if($('#button2').click()){
          var target = document.getElementById("button2");
          changeFontSize(target);}
              
    }, 2);

    // Function helping in changing the font size
  function changeFontSize(target) {
    // console.log("in changefontsize function.")
    var demo = document.getElementById("fontButton");
    var computedStyle = window.getComputedStyle
          ? getComputedStyle(demo) // Standards
          : demo.currentStyle;     // Old IE
    var fontSize;

    if (computedStyle) { // This will be true on nearly all browsers
        fontSize = parseFloat(computedStyle && computedStyle.fontSize);
        // console.log("about to increase or decrease after comparison")
        if (target == document.getElementById("button1")) {
          fontSize += 30;
        }
        if (target == document.getElementById("button2")) {
          fontSize -= 15;
        }
        demo.style.fontSize = fontSize + "px";
    }
  }

  $('.text').eyeIn(function()
    {
      if($('#savingText').click()){
        saveDynamicDataToFile(storingInArray);
      }
    }, 2);

  // Function helping in saving the highlighted text for later use
  function saveDynamicDataToFile(userInput) {

    var blob = new Blob([userInput], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "HighlightedNotes.txt");
  }
  
  var normReadTime;
  var indentReadTime;
   $('#readingSpeed').eyeIn(function(){
    if($(this).click()){
      normReadTime = milisec;
      isPaused = true;
      offset = 0;
      offset += (new Date()).getTime() - time.getTime();
      readingSpeed();
    }    
  },2);

  function readingSpeed(){
    // var normReadTime = milisec;
    // isPaused = true;
    // offset = 0;
    // offset += (new Date()).getTime() - time.getTime();
    readWordsInArray = [];
    confirm("Indenting means simply stopping your eyes on the first line about half an inch inside the left margin and ending it about a half an inch before the right margin. The lines down the sides of these paragraphs show approximately where your first and last fixations should fall. As a result, you can eliminate a total of one full fixation each line.");
    $("p").addClass("para");
  }

  $('#readingSpeedOut').eyeIn(function(){
    if($(this).click()){
      indentReadTime = milisec;
      isPaused = false;
      time = new Date();
      // clearInterval(t);
      readingSpeedOut();
      }    
  },2);

  function readingSpeedOut(){
    $("p").removeClass("para");
  }

  $('#analysis').eyeIn(function (){
    if($(this).click()){
      console.log("Anlaysis Button Clicked");
      alert("Normal Reading Time: " + (parseInt(normReadTime/1000)/60).toPrecision(3) + " minutes and Indenting Reading Time: " + (parseInt(indentReadTime/1000)/60).toPrecision(3) + " minutes");
    }


  }, 2);

  $('#speedChecker').eyeIn(function(){

    if($(this).click()){
      var timing = parseInt(milisec / 1000) / 60;
      alert("If your Words per Minute were between the following range then you are probably a:\n A. Slow Reader (100 to 200) \n B. Average Reader (200 to 300) \n C. Good Reader (300 to 400) \n D. Above Average Reader (400 to 500)" + "\n\n You have read " + readWordsInArray.length + " words in " + timing.toPrecision(3) + " minutes");
    }    
  },2);

}); // whole document close paranthesis.

  let msgToSpeak1 = new Set(storingInArray);
  var msgToSpeak = Array.from(msgToSpeak1);
  // var msgToSpeak = storingInArray;
  // console.log("outside arr"+ msgToSpeak);
  if ('speechSynthesis' in window) {
  	$(document).on('click', '#speak', function(){
      // console.log("After click");
  		var msg = new SpeechSynthesisUtterance(msgToSpeak);
      // console.log("after speech syn"+ msg);
  		var voices = window.speechSynthesis.getVoices();
  		msg.voice = voices[1]; // Note: some voices don't support altering params
  		msg.voiceURI = 'native';
  		msg.volume = 1; // 0 to 1
  		msg.rate = 1; // 0.1 to 10
  		msg.pitch = 2; //0 to 2
  		// msg.lang = 'en-US';

  		msg.onend = function(e) {
  		  // console.log('Finished in ' + event.elapsedTime + ' seconds.');
  		};

  		window.speechSynthesis.speak(msg);
      // console.log("after speak");
  	})
  }
  else{
    alert("No Speech Synthesis Support From Your Browser");
  }