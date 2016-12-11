$(document).ready(function () {
	$('#game').html('<div id="clickStart">Click to start the game</div>');
	$('#clickStart').click(function(){
		start();
	});
	
	var points = 0;
	var round;
	
	function start(){
		points = 0;
		bonusPoints = 0;
		totalPoints = 1;
		round = 'easy';
		randomColour();
	}
	
	
	function randomColour(){
	totalPoints = points + bonusPoints;
		if (points >= 0 && points <= 9){
			round='easy';
			newRound();
			colours('.box3',1,10);
		} else if (points >= 10 && points <=29){
			round='medium';
			newRound();
			colours('.box4',3,8);
		} else if (points >= 30){
			round='hard';
			newRound();
			colours('.box5',4,5);
		}
	}
	
	function newRound(){
		if (round == 'easy'){
			timeLimit(5);
			$('#game').html("<div class='box3'></div>".repeat(9));
		} else if (round == 'medium'){
			timeLimit(10);
			$('#game').html("<div class='box4'></div>".repeat(16));
		}else if (round == 'hard'){
			timeLimit(15);
			$('#game').html("<div class='box5'></div>".repeat(25));
		}
	}
	
	function colours(box,divide,addition){
			var mainColour1 = Math.round(Math.random() * 255);
			var mainColour2 = Math.round(Math.random() * 255);
			var mainColour3 = Math.round(Math.random() * 255);
			$(box).css({'background-color':'rgb' + '(' + mainColour1 + ',' + mainColour2 + ',' + mainColour3 + ')'});
			luckyBox = Math.floor(Math.random() * $(box).length);
			var rgbSec = Math.floor(Math.random() * 3) + 1;
			var posneg = Math.floor(Math.random() * 2) + 1;
			
			if (posneg == 1){
				if (rgbSec == 1){
					otherColour1 = mainColour1 - Math.round(Math.random() * (mainColour1 / divide) + addition);
					otherColour2 = mainColour2 - Math.round(Math.random() * (mainColour2 / divide) + addition);
					otherColour3 = mainColour3;
				} else if (rgbSec == 2){
					otherColour1 = mainColour1;
					otherColour2 = mainColour2 - Math.round(Math.random() * (mainColour2 / divide) + addition);
					otherColour3 = mainColour3 - Math.round(Math.random() * (mainColour3 / divide) + addition);
				} else if (rgbSec == 3){
					otherColour1 = mainColour1 - Math.round(Math.random() * (mainColour1 / divide) + addition);
					otherColour2 = mainColour2;
					otherColour3 = mainColour3 - Math.round(Math.random() * (mainColour3 / divide) + addition);
				}
			} else if (posneg == 2){
				if (rgbSec == 1){
					otherColour1 = mainColour1 + Math.round(Math.random() * (mainColour1 / divide) + addition);
					otherColour2 = mainColour2 + Math.round(Math.random() * (mainColour2 / divide) + addition);
					otherColour3 = mainColour3;
					otherColour3 = mainColour3;
					if (otherColour1 > 255){
						otherColour1 = 255;
					} else if (otherColour2 > 255){
						otherColour2 = 255;
					}
				} else if (rgbSec == 2){
					otherColour1 = mainColour1;
					otherColour2 = mainColour2 - Math.round(Math.random() * (mainColour2 / divide) + addition);
					otherColour3 = mainColour3 - Math.round(Math.random() * (mainColour3 / divide) + addition);
					if (otherColour2 > 255){
						otherColour2 = 255;
					} else if (otherColour3 > 255){
						otherColour3 = 255;
					}
				} else if (rgbSec == 3){
					otherColour1 = mainColour1 - Math.round(Math.random() * (mainColour1 / divide) + addition);
					otherColour2 = mainColour2;
					otherColour3 = mainColour3 - Math.round(Math.random() * (mainColour3 / divide) + addition);
					if (otherColour1 > 255){
						otherColour1 = 255;
					} else if (otherColour3 > 255){
						otherColour3 = 255;
					}
				}
			}
			$(box).eq(luckyBox).css({'background-color':'rgb' + '(' + otherColour1 + ',' + otherColour2 + ',' + otherColour3 + ')'});
			//alert(luckyBox + '(' + otherColour1 + ',' + otherColour2 + ',' + otherColour3 + ')' + '(' + mainColour1 + ',' + mainColour2 + ',' + mainColour3 + ')')
			$(box).click(function(){
			clearInterval(timer);
				var thisIndex = $(this).index(box);
				if (thisIndex == luckyBox){
					if (fastTime >= 0){
						bonusPoints++;
						$('#fastText').html("<p>FAST! +1 Points</p>").fadeIn( 800 ).fadeOut( 800 );  
					}
					clearInterval(fastTimer);
					points++;
					totalPoints = points + bonusPoints;
					$('#pointCounter').html('<h2>Points: ' + totalPoints + '</h2>')
					randomColour();
					return false;
				} else if (thisIndex != luckyBox){
					$('#game').html('<h2>Game Over!</h2>')
				}
			});
			
	}
	

//time limit function
var timer; 
var fastTime;
function timeLimit(seconds){
	var time = seconds;
	timer = setInterval(function() { 
	   $('#timer h2').text('Time Left: ' + time--);
	   if (time == -1) {
		$('#game').html('<h1>Game Over!</h1><h2>You ran out of time :\(</h2>')
		clearInterval(timer);
	   } 
	}, 1000);
	fastTime = 1;
	fastTimer = setInterval(function() { 
	   fastTime--;
	}, 1000);
}

	$('#submit').click(function(){
		$('body').css({'background-color':colourPicker.value});
	});
});