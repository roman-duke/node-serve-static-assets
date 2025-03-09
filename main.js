import http from 'http';
import fs from "fs";
import url from "url"

http.createServer((req, res) => {
  var path = url.parse(req.url).pathname;
  console.log(path);
  switch (path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('index.html').pipe(res);
      break;
    case '/index.js':
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      fs.createReadStream('index.js').pipe(res);
      break;
    case '/index2.js':
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      fs.createReadStream('index2.js').pipe(res);
      break;
    case '/index3.js':
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      fs.createReadStream('index3.js').pipe(res);
      break;
    default:
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('index.html').pipe(res);
      break;
  }
  // res.end(index);
}).listen(8080, "localhost", () => {
  console.log('Server running at http://localhost:8080/');
})
