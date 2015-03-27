var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
var urlParser = require('url');


var actions = {

  'GET': function(request, response, url){
  	helper.serveAssets(response, url, fs.readFileSync);
  },

  'POST': function(request, response){
    fetchData(request, function(message){
      helper.sendResponse(response, {objectId: 1});
    });
  }
  
}

exports.handleRequest = function(request, response) {
  console.log("Serving request type" + request.method + "for url" + request.url);
  var statusCode = 200;
  var action = actions[request.method];
  var url  = request.url;

  url === "/" ? url = archive.paths.index : url = archive.paths.archivedSites + url
  console.log(url);

  if (action){
    action(request, response, url);
  } else {
    helper.sendResponse(response, "Not Found", 404);
  }
};
