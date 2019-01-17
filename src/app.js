const fs = require("fs");

const send = function(res, statusCode, content) {
  res.statusCode = statusCode;
  if (content) res.write(content);
  res.end();
};

const readFiles = function(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404);
    } else {
      send(res, 200, data);
    }
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
