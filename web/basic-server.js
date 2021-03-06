var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");

initialize();

var port = 3000;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

