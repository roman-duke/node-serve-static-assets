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
  const filePath = url.slice(1);

  if (extension !== "mp4") {
    // synchronously read our static files because they are really small in size.
    const fileContent = fs.readFileSync(filePath, {
      encoding: extension == "jpg" ? undefined : "utf-8",
    });
    res.writeHead(200, { "content-type": getMimeType(extension) });
    res.end(fileContent);
  } else {
    fs.stat(filePath, (err, stats) => {
      if (err) res.end(err);
      const range = req.headers.range;
      if (!range) {
        // 416 Wrong range
        return res.writeHead(416, "Invalid range");
      }

      const fileSize = stats.size;
      const { start, end, chunkSize } = getStreamArguments(range, fileSize);

      res.writeHead(206, {
        "content-range": `bytes ${start}-${end}/${fileSize}`,
        "accept-ranges": "bytes",
        "content-length": chunkSize,
        "content-type": getMimeType(extension),
      });

      fs.createReadStream(filePath, {
        start: start,
        end: end,
      }).pipe(res);
    });
  }

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
    case "mp4":
      return "video/mp4";
    default:
      return "application/octet-stream";
  }
}

function getStreamArguments(range: string, total: number) {
  const positions = range.replace(/bytes=/, "").split("-");
  const start = parseInt(positions[0], 10);
  const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
  const chunkSize = (end - start) + 1;

  return {
    start, end, chunkSize
  }
}
