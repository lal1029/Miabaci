'use strict';

function yingyang(parentNode, floatVal, img) {
	this.direction = 'left';
	this.element = document.createElement('div');
	this.element.className = 'logo';
	this.element.style.cssFloat = floatVal;
	this.element.style.backgroundImage = img;
	//this.element.style.cssClear = 'both';
	parentNode.appendChild(this.element);
}

function row()
{
	this.element = document.createElement('div');
	this.element.className = 'row';
	//this.element.style.backgroundColor = color;
	document.body.appendChild(this.element);
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/*
window.onload = function(){
		var startReverse = function(tween){
			tween.reverse();
		};

		var startReplay = function(tween){
			//var duration = getRandomArbitrary(2, 12);
			//tween.timeScale(duration);
			tween.play();
		};

		for(var i=0; i<10; i++)
		{
			var aRow = new row;
			var yingObj = new yingyang(aRow.element, 'left', "url('/images/Ying.png')");
			var yangObj = new yingyang(aRow.element, 'right', "url('/images/Yang.png')");
			
			//var yingDuration = getRandomArbitrary(2, 10);
			var yingDuration = 3;
			TweenLite.to(yingObj.element, yingDuration, {left:'45%', onComplete:startReverse, onCompleteParams:["{self}"], onReverseComplete:startReplay, onReverseCompleteParams:["{self}"]});
			
			//var yangDuration = getRandomArbitrary(2, 10);
			var yangDuration = 3;
			TweenLite.to(yangObj.element, yangDuration, {right:'45%', onComplete:startReverse, onCompleteParams:["{self}"], onReverseComplete:startReplay, onReverseCompleteParams:["{self}"]});	
		}
};
*/

window.onload = function(){
		var startReverse = function(tween){
			tween.reverse();
		};

		var startReplay = function(tween){
			var duration = getRandomArbitrary(2, 12);
			tween.timeScale(duration);
			tween.play();
		};

		for(var i=0; i<10; i++)
		{
			var aRow = new row;
			var yingObj = new yingyang(aRow.element, 'left', "url('/images/Ying.png')");
			var yangObj = new yingyang(aRow.element, 'right', "url('/images/Yang.png')");
			
			var yingDuration = getRandomArbitrary(2, 10);
			TweenLite.to(yingObj.element, yingDuration, {left:'45%', onComplete:startReverse, onCompleteParams:["{self}"], onReverseComplete:startReplay, onReverseCompleteParams:["{self}"]});
			
			var yangDuration = getRandomArbitrary(2, 10);
			TweenLite.to(yangObj.element, yangDuration, {right:'45%', onComplete:startReverse, onCompleteParams:["{self}"], onReverseComplete:startReplay, onReverseCompleteParams:["{self}"]});	
		}
};

/*external js
http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js
http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js
*/
/*
window.onload = function() {
  var logo = document.getElementById("logo"),
		    playBtn = document.getElementById("playBtn"),
		    pauseBtn = document.getElementById("pauseBtn"),
		    resumeBtn = document.getElementById("resumeBtn"),
		    reverseBtn = document.getElementById("reverseBtn"),
		    playFromBtn = document.getElementById("playFromBtn"),
		    reverseFromBtn = document.getElementById("reverseFromBtn"),
		    seekBtn = document.getElementById("seekBtn"),
		    timeScaleSlowBtn = document.getElementById("timeScaleSlowBtn"),
		    timeScaleNormalBtn = document.getElementById("timeScaleNormalBtn"),
		    timeScaleFastBtn = document.getElementById("timeScaleFastBtn"),
        	restartBtn = document.getElementById("restartBtn"),
		    tween = TweenLite.to(logo, 6, {left:"632px", ease:Linear.easeNone});
		
  playBtn.onclick = function() {
		//Play the tween forward from the current position.
		//If tween is complete, play() will have no effect
    tween.play();
	  }
	  pauseBtn.onclick = function() {
		  tween.pause();
	  }
	  resumeBtn.onclick = function() {
		  //Resume playback in current direction.
		  tween.resume();
	  }
	  reverseBtn.onclick = function() {
		  tween.reverse();
	  }
	  playFromBtn.onclick = function() {
		  //Play from a sepcified time (in seconds).
		  tween.play(5);
	  }
	  reverseFromBtn.onclick = function() {
		  //Reverse from a specified time (in seconds).
		  tween.reverse(1);
	  }
	  seekBtn.onclick = function() {
		  //Jump to specificied time (in seconds) without affecting
		  //whether or not the tween is paused or reversed.
		  tween.seek(3);
	  }
	  timeScaleSlowBtn.onclick = function() {
	  	//timescale of 0.5 will make the tween play at half-speed (slower).
		  //Tween will take 12 seconds to complete (normal duration is 6 seconds).
		  tween.timeScale(0.5);
	  }
	  timeScaleNormalBtn.onclick = function() {
		  //timescale of 1 will make tween play at normal speed.
		  tween.timeScale(1);
	  }
	  timeScaleFastBtn.onclick = function() {
		  //timescale of 1 will make the tween play at double-speed (faster).
		  //Tween will take 3 seconds to complete (normal duration is 6 seconds).
		  tween.timeScale(2);
	  }
	  restartBtn.onclick = function() {
		  //Start playing from a progress of 0.
		  tween.restart();
	  }
}
*/

/*
window.onload = function(){

	for(var i=0; i<1; i++)
	{
		var yingobj = new ying;

		if(i%2)
		{
			yingobj.direction = 'left';
			yingobj.element.style.cssFloat = 'right';
		}
		
		TweenLite.to(yingobj.element, 5, {left:'45%'});
	}
};
*/