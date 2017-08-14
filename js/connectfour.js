$(document).ready(function()
{
	loadGame();
	
	
	
});

function loadGame()
{
	var canvas = document.createElement("canvas");
	canvas.width = "100%";
	canvas.height = "100%";
	$("body").append(canvas);
}