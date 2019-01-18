const fs = require("fs");
const Sheeghra = require("./sheeghra");
const app = new Sheeghra();

const readBody = (req, res, next) => {
  let content = "";
  req.on("data", chunk => (content += chunk));
  req.on("end", () => {
    req.body = content;
    next();
  });
};

const send = (res, content, statusCode = 200) => {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const sendNotFound = function(req, res) {
  res.statusCode = 404;
  res.end();
};

const readFiles = function(req, res) {
  let filePath = filePathHandler(req.url);
  console.log(filePath, req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, "fileNotFound", 404);
    } else {
      console.log("it came", req.url);
      send(res, data, 200);
    }
  });
};

const filePathHandler = function(path) {
  if (path == "/") {
    return "./public/index.html";
  }
  return `./public${path}`;
};

app.get("/", readFiles);
app.get("/images/freshorigins.jpg", readFiles);
app.get("/images/animated-flower-image-0021.gif", readFiles);
app.get("/main.js", readFiles);
app.get("/style.css", readFiles);
app.get("/guestBook.html", readFiles);
app.use(sendNotFound);

module.exports = app.handleRequest.bind(app);
