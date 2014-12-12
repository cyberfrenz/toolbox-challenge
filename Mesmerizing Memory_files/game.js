"use strict";

var gameBoard = $('#game-board');
var matches = 0;
var tries = 0;
var pairsLeft = 8;
var images = [];
var timer; 
var clicks = 0;
var tile1 = null;
var tile2 = null;
$('#matches').text("Matches: " + matches);
$('#tries').text("Tries so Far: " + tries);
$('#pairsLeft').text("Pairs Left: " + pairsLeft);

for (var i = 1; i < 33; i++) {
	images.push("img/tile" + i + ".jpg"); 
}

function createBoard() {
	images = _.shuffle(images).splice(0, 8);
	images = images.concat(images);
	images = _.shuffle(images);
	for (var i = 0; i < 16; i++) {
		var newTile = $(document.createElement('img'));
		var image = images[i];
		newTile.attr('src', 'img/tile-back.png');
		newTile.data('tileNumber', i); 
		newTile.data('img', image); 
		newTile.data('flippable', true)
		gameBoard.append(newTile); 
	}
}

createBoard();

$("#playAgain").one("click" ,function() { // resets the game
	location.reload();
})

$('#game-board').one("click" ,function(){
	var startTime = _.now();
	var time = window.setInterval(function() {
		timer = Math.floor((_.now() - startTime) / 1000);
		$('#timer').html("Timer: " + timer)}, 1000);
})

$('#howToPlay').one("click" ,function() {
	window.location.href="http://www.classicgamesandpuzzles.com/Memory.html";
})

$('#game-board img').click(function() {
	if($(this).data('flippable')) {
	//$(this).attr('src', images[$(this).data('tileNumber')]);
		if (clicks == 0) {
			tile1 = $(this);
			clicks++;
			tile1.data('flippable', false);
			tile1.attr('src', images[$(this).data('tileNumber')]);
		} else {
			tile2 = $(this);
			clicks++;
			tile2.data('flippable', false);
			tile2.attr('src', images[$(this).data('tileNumber')]);
		}

		if(clicks === 2) {
			tries++;
			if(tile1.data('img') === tile2.data('img')) {
				matches++;
				pairsLeft--;
			} else {
				window.setTimeout(function(){
					tile1.data('flippable', true);
					tile2.data('flippable', true);
					tile1.attr('src', 'img/tile-back.png');
					tile2.attr('src', 'img/tile-back.png');
					}, 1000);
			}	
			clicks = 0;
			$('#matches').text("Matches: " + matches);
			$('#tries').text("Tries so Far: " + tries);
			$('#pairsLeft').text("Pairs Left: " + pairsLeft);
		}
	}
	if (matches == 8) {
		var win = window.confirm("Click here for your prize!");
		if (win == true) {
			window.location.href = "https://www.youtube.com/watch?v=beB6nex_mHk";
		}
	}
});

