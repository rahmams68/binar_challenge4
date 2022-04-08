const http = require('http');
const { PORT = 8000 } = process.env;

const fs = require('fs');
const path = require('path');

function getHTML(htmlFileName) {
  const htmlFilePath = path.join("./", htmlFileName)
  return fs.readFileSync(htmlFilePath, 'utf-8')
}

function onRequest(req, res) {
    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(htmlFile)
    }

    else if (req.url === "/cari-mobil") {
      const htmlFile = fs.readFileSync("./public/cari-mobil.html", "utf-8");
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(htmlFile)
    }

    else if (req.url === "/getcars") {
      const fileStream = fs.createReadStream("./data/cars.json", "utf-8");
      res.writeHead(200, {"Content-Type": "application/json"})
      fileStream.pipe(res)
    }


    else if (req.url.match("\.png$")) {
      const imagePath = path.join('./public', req.url)
      const fileStream = fs.createReadStream(imagePath)
      res.writeHead(200, {"Content-Type": "image/png"})
      fileStream.pipe(res)
      // console.log("====== IMAGES PNG OK! ======")
    }

    else if (req.url.match("\.jpg$")) {
      const imagePath = path.join('./public', req.url)
      const fileStream = fs.createReadStream(imagePath)
      res.writeHead(200, {"Content-Type": "image/png"})
      fileStream.pipe(res)
      // console.log("====== IMAGES JPG OK! ======")
    }

    else if (req.url.match("\.css$")) {
      const cssPath = path.join('./public/css', req.url)
      const fileStream = fs.createReadStream(cssPath, "UTF-8")
      res.writeHead(200, {"Content-Type": "text/css"})
      fileStream.pipe(res)
      // console.log("====== CSS OK! ======")
    }

    else if (req.url.match("\.js$")) {
      const jsPath = path.join('./public/scripts', req.url)
      const fileStream = fs.createReadStream(jsPath)
      res.writeHead(200, {"Content-Type": "application/javascript"})
      fileStream.pipe(res)
      // console.log("====== JS OK! ======")
    }

    else {
      const html404 = fs.readFileSync("./public/404.html", "utf-8");
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(html404)
    }
}

const server = http.createServer(onRequest);

server.listen(PORT, '127.0.0.1', () => {
    console.log("Server sudah berjalan, silahkan buka http://127.0.0.1:%d", PORT);
})