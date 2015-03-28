var fs = require('fs');
var path = require('path');
var _ = require('underscore');


exports.paths = {

  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')

};


exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};


exports.readListOfUrls = function(callback){
	fs.readFile(exports.paths.list, function(err, data){
		if( !err ){
			var url = ('' + data).split('\n');
		}
		if (callback){
			callback(url);
		}			
	});
};

exports.isUrlInList = function(url, callback){
	fs.readFile(exports.paths.list, function(err, data){
		var result = false;
		if ( !err ){
			var urls = ('' + data).split('\n');
			var test = _.indexOf(urls, url)
			if (test > -1) {
				result = true;
			}
		}
		callback(result);
	})
};

exports.addUrlToList = function(newfile, callback){
	fs.appendFile(exports.paths.list, newfile.url + '\n', function(err){
  	if (err){
  		console.log("err");
  	}
  	// callback();
  });
};

exports.isUrlArchived = function(){

};

exports.downloadUrls = function(){
};
