// Setting up modules
var http = require("http"); // HTTP
var url = require("url"); // URL handling
var fs = require("fs"); // File serving

const hostname = "localhost";
const port = 8080; // Error: listen EACCES: permission denied 127.0.0.1:80

http
  .createServer(function(req, res) {
    var queryData = url.parse(req.url, true); // parse the URL data
    console.log(queryData.pathname);
    var filename = "../client" + queryData.pathname; // assign a file name for retrieval
    if (filename.slice(-1) !== "/") {
      filename += "/";
    }
    filename += "index.html";
    console.log(filename);

    // Read the file. If it exists send the contents back, if not return a 404 error
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end(
          '<h1>404 Not Found</h1><p>return to <a href="/">default page</a></p>'
        );
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}/` + " ok");
  });

/*
const http = require("http");
const url = require("url");
require("date-utils");

const hostname = "localhost";
const port = 8080;

// Create the server to work with the query string
http
  .createServer(function(req, res) {
    // Send an OK header since everything is fine here
    res.writeHead(200, { "Content-Type": "text/ html" });
    // Split the URL into parts
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    let queryString = "";
    Object.keys(queryData).forEach(key => {
      if (queryString != "") {
        queryString += ", ";
      }
      queryString += `${key}:${queryData[key]}`;
    });
    if (queryString == "") {
      queryString = "No query";
    }
    // Get current datetime
    let now = new Date();

    // Now we have an object we can work with
    var returnValue =
      `request time: ${now.toFormat("MMM DD YYYY HH24:MI:SS")}\n` +
      `url: ${hostname}:${port}${req.url}\n` +
      `query: ${queryString}`;
    console.log(returnValue);

    // End the response and send back returnValue
    res.end(returnValue);
  })
  .listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}/` + " ok");
  });
*/
