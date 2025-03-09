import * as http from "http";
// import fs from "fs";
// import url from "url"

http.createServer((req, res) => {
  const url = req.url as string;

  if (url.endsWith('favicon.ico')) {
    res.writeHead(404, { "content-type": "text/plain" });
    return res.end('File not found', 'utf-8');
  }

  const extension = url.split('.').at(-1);
  console.log(extension);


  return res.end();
}).listen(8080, "localhost", () => {
  console.log('Server running at http://localhost:8080');
})


// res.writeHead(200, { "Content-Type": "text/html" });
// fs.createReadStream("index.html").pipe(res);

// function getMimeType
