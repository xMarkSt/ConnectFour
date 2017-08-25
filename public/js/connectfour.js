$(document).ready(function()
{
	var socket = io();	
	var canvas;
	var context;
	var components = [];
	loadGame();
	
	//Draw images onload
	for(var i = 0; i < components.length; i++)
	{
		var component = components[i];
		if(component.type == "image")
		{
			component.image.onload = function()
			{
				context.drawImage(component.image, component.x, component.y, component.width, component.height);
			};
		}
	}
	
	function clearCanvas()
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
		components = [];
		$('canvas').css('cursor', 'default');		
	}
	
	function centerWidth(width)
	{
		return canvas.width / 2 - width / 2;
	}

	function centerHeight(height)
	{
		return canvas.height / 2 - height / 2;
	}
	
	function generateRandomCode()
	{
		return 	Math.random().toString(36).substr(2, 5).toUpperCase();
	}
	
	function loadGame()
	{
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		var canvasWidth = window.innerWidth * 0.85;
		var canvasHeight = window.innerHeight * 0.85;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		$("#game").append(canvas);
		addComponent("playButton", 200, 50, "img/play.png", centerWidth(200), centerHeight(50), "image", "pointer");
	}
	
	function addComponent(name, width, height, color, x, y, type, cursor)
	{
		new component(name, width, height, color, x, y, type, cursor);	
	}
	
	function isOnAnyComponent(x, y)
	{
		for(var i = 0; i < components.length; i++)
		{
			var component = components[i];
			if (y > component.y && y < component.y + component.height 
			&& x > component.x && x < component.x + component.width) 
			{
				return true;
			}
		}
		return false;
		
	}
	
	function getComponent(componentName)
	{		
		//Find component object
		for(var i = 0; i < components.length; i++)
		{
			if(components[i].name == componentName)
			{
				return components[i];
			}
		}
		
		return null;
	}
	
	function isOnComponent(component, x, y)
	{
		component = getComponent(component);
		
		if (y > component.y && y < component.y + component.height 
		&& x > component.x && x < component.x + component.width) 
		{
			return true;
		}
		return false;
	}
	
	function getCurrentComponent(x, y)
	{
		//Find component object
		for(var i = 0; i < components.length; i++)
		{
			var component = components[i];
			if (y > component.y && y < component.y + component.height 
			&& x > component.x && x < component.x + component.width) 
			{
				return component;
			}
		}
		
		return null;
			
	}
	
	socket.on("party create", function(code)
	{
		console.log(code);
		
		//Share this link with your friends:
		var titleFont = 0.05 * canvas.width;
		var titleHeight = canvas.height / 2;
		context.font = titleFont + "px Arial";
		context.textAlign = "center";
		context.fillText("Share this link with your friends:", canvas.width / 2, titleHeight);
		
		//Link with code
		var link = window.location.href + "#" + code;
		//context.font = 0.03 * canvas.width + "px Arial";
		//context.textAlign = "center";
		//context.fillText(link, canvas.width / 2, titleHeight + titleFont);
		//var inputWidth = document.getElementById("party").getElementsByTagName("input")[0].offsetWidth;
		var inputWidth = $("#party input").outerWidth();
		var bodyWidth = $("body").outerWidth();
		
		$("#party input").val(link);
		$("#party input").css("display", "block");
		$("#party input").css("left", bodyWidth / 2 - inputWidth / 2 + "px");
	});
	
	$( "canvas" ).click(function(event) 
	{
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		
		if(isOnAnyComponent(x, y))
		{
			if(getCurrentComponent(x,y).name == "playButton")
			{
				clearCanvas();
				socket.emit("party create");
			}
		}
	});

	$( "canvas" ).mousemove(function(event) 
	{
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		//if(IsOnComponent(playButton, x, y))
		if(isOnAnyComponent(x, y))
		{
			$('canvas').css('cursor', getCurrentComponent(x,y).cursor);		
		}

		else
		{
			$('canvas').css('cursor', 'default');		
		}
	});

	function component(name, width, height, color, x, y, type, cursor) 
	{
		this.name = name;
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
		
		components.push(this);
		
		this.remove = function()
		{
			context.save();
			context.clearRect(this.x, this.y, this.width, this.height);
			context.restore()
			
			if(components.indexOf(this) > -1)
			{
				components.splice(components.indexOf(this), 1);
			}
		};
	}
});