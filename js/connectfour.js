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
	playButton = new component(200, 50, "http://www.matim-dev.com/uploads/1/5/8/0/15804842/6920066_orig.png", centerWidth(200), centerHeight(50), "image");
}

function clickedOnComponent(component, x, y)
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
	
	canvas.addEventListener('click', function(event) {
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		if(clickedOnComponent(playButton, x, y))
		{
			alert("Start game.");
		}

		//alert("X: " + x + "\nY: " + y);

	}, false);
});

function component(width, height, color, x, y, type) 
{
	this.type = type;
	if (type == "image")
	{
		this.image = new Image();
		this.image.src = color;
	}
	
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
	if (type == "image") 
	{
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
	} 

	else 
	{
		context.fillStyle = color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}