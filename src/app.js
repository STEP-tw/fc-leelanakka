const fs = require("fs");

const readFiles = function(req, res) {
  let filePath = `.${req.url}`;
  if (req.url === "/") {
    filePath = "public/home.html";
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.write("it came");
      res.end();
      return;
    }
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.statusCode = 200;
    res.end();
  });
};

const app = (req, res) => {
  readFiles(req, res);
};

module.exports = app;
