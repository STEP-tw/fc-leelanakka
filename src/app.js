const fs = require("fs");

const readFiles = function(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end();
      return;
    }
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.statusCode = 200;
    res.end();
  });
};

const filePathHandler = function(path) {
  if (path == "/") {
    return "./public/index.html";
  }
  return `./public${path}`;
};

const app = (req, res) => {
  let filePath = filePathHandler(req.url);
  readFiles(res, filePath);
};

module.exports = app;
