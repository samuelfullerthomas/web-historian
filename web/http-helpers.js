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
	callback(asset, function(err, data){
		if (err) {
			res.writeHead(404, headers);
			res.end();
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

exports.fetchData = function(request, cb){
  var data = "";
  request.on('data', function(chunk){
    data += chunk
  });

  request.on('end', function(){
    cb(JSON.parse(data));
  });

};


// As you progress, keep thinking about what helper functions you can put here!
