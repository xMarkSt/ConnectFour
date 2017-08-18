function centerWidth(width)
{
	return canvas.width / 2 - width / 2;
}

function centerHeight(height)
{
	return canvas.height / 2 - height / 2;
}

var canvas;
var context;
var playButton;

function loadGame()
{
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	var canvasWidth = window.innerWidth * 0.85;
	var canvasHeight = window.innerHeight * 0.85;
	
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	$("body").append(canvas);
	playButton = new component(200, 50, "img/play.png", centerWidth(200), centerHeight(50), "image", "pointer");
}

function IsOnComponent(component, x, y)
{
	if (y > component.y && y < component.y + component.height 
	&& x > component.x && x < component.x + component.width) 
	{
		return true;
	}
	return false;
}

$(document).ready(function()
{
	loadGame();
	playButton.image.onload = function()
	{
		context.drawImage(playButton.image, playButton.x, playButton.y, playButton.width, playButton.height);
	};
		
	$( "canvas" ).click(function(event) {
 	 var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		if(IsOnComponent(playButton, x, y))
		{
			alert("Start game.");			
		}
	});
	
	$( "canvas" ).mousemove(function(event) {
	 	var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		if(IsOnComponent(playButton, x, y))
		{
			$('canvas').css('cursor', playButton.cursor);		
		}
		
		else
		{
			$('canvas').css('cursor', 'default');		
		}
	});
});


function component(width, height, color, x, y, type, cursor) 
{
	this.type = type;
	this.cursor = cursor;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
	if (type == "image") 
	{
		this.image = new Image();
		this.image.src = color;
	} 

	else 
	{
		context.fillStyle = color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}