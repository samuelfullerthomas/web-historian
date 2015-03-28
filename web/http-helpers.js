var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
	var data = callback(asset, function(err, data){
		if(err){
			res.writeHead(404, headers);
			res.end()
		}
		res.writeHead(200, headers);
		res.end(data);
	});

};

exports.sendResponse = function(reponse, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};

exports.postData = function(response, url){
	var newfile = JSON.parse(url);
	archive.addUrlToList(newfile);

	console.log('File saved!');
	response.writeHead(302);
	response.end();
};

