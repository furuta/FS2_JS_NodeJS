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
