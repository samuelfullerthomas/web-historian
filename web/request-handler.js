var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
var urlParser = require('url');


var actions = {

  'GET': function(request, response, url){
  	helper.serveAssets(response, url, fs.readFile);
  },

  'POST': function(request, response){
  	var x = ''
  	request.on('data', function(data){
  		x += data;
  	})
  	request.on('end', function(){
  		console.log("Data added!");
  		helper.postData(response, x);
  	});
  }
  
}

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  var action = actions[request.method];
  var url  = request.url;

  url === "/" ? url = archive.paths.index : url = archive.paths.archivedSites + url

  if (action){
    action(request, response, url);
  } else {
    helper.sendResponse(response, "Not Found", 404);
  }
};
