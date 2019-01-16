const fs = require("fs");

const readFiles = function(res, fileName) {
  fs.readFile(fileName, (err, data) => {
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

const app = (req, res) => {
  readFiles(res, req.url.slice(1) || "flowerCatalog.html");
};

// Export a function that can act as a handler

module.exports = app;
