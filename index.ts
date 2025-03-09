import * as http from "http";
import * as fs from "fs";

http.createServer((req, res) => {
  const url = req.url as string;

  if (url == "/") {
    return res.end();
  } else if (url.endsWith("favicon.ico")) {
    res.writeHead(404, { "content-type": "text/plain" });
    return res.end("File not found", "utf-8");
  }

  const extension = url.split(".").at(-1);
  const fileContent = fs.readFileSync(url.slice(1), {
    encoding: extension === "jpg" ? null : "utf-8"
  });

  res.writeHead(200, { "content-type": getMimeType(extension) });
  res.end(fileContent);
})
.listen(8080, "localhost", () => {
  console.log("Server running at http://localhost:8080");
});

function getMimeType(extension: string | undefined) {
  switch (extension) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    case "jpg":
      return "image/jpeg";
    default:
      return "application/octet-stream";
  }
}
