var express = require('express');
var request = require('request');
var app = express();






app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	var newsData = {};
	var url = "https://newsapi.org/v1/articles?source=techcrunch&apiKey=9667e9e4e1de495ba09b4b875dff8039";
	var info = '';

	request({
		url: url,
		json: true
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			newsData = body;
			newsData.articles.forEach(function(article) {
				info += `
				<article>
					<h2>${article.title}</h2>
					<span>Published at ${article.publishedAt}</span>
					<p>${article.description}</p>
					<a href="${article.url}"><img src="${article.urlToImage}"></img></a>
				</article>
				`
			})
			res.send(`
					<h1>Techcrunch</h1>
					${info}
				`);
		}
	});
});

var server = app.listen(app.get('port'), function() {
	console.log("Listening on port " + app.get('port'));
});



// Hnadling HTTP requests with Node.js
// var http = require('http');

// var myServer = http.createServer(function(request, response) {
// 	response.writeHead(200, {"Content-Type": "text/html"});
// 	response.write('<h1>Hello there!</h1>');
// 	response.end();
// });

// myServer.listen(3000);
// console.log("Listening to port 3000");