const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path")

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res)
{
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket)
{
	console.log("Someone connected");
	socket.on("disconnect", function()
	{
		console.log("Someone disconnected.");
	});
	
	socket.on("party create", function()
	{
		var randomCode = generateRandomCode();
		io.emit("party create", randomCode); 
		console.log(randomCode);
	});

});

http.listen(3000, function()
{
	console.log("Listening on *:3000");
});

function generateRandomCode()
{
		return 	Math.random().toString(36).substr(2, 5).toUpperCase();
}