const fs = require("fs");
const Sheeghra = require("./sheeghra");
const app = new Sheeghra();
const Comment = require("./comments.js");

if (!fs.existsSync("./public/comments.json")) {
  fs.writeFileSync("./public/comments.json", "[]");
}

let comments = fs.readFileSync("./public/comments.json", "utf8");
comments = JSON.parse(comments);
const comment = new Comment(comments);

const logRequest = (req, res, next) => {
  console.log(req.method, req.url);
  console.log("headers =>", JSON.stringify(req.headers, null, 2));
  console.log("body =>", req.body);
  next();
};

const readBody = (req, res, next) => {
  let content = "";
  req.on("data", chunk => (content += chunk));
  req.on("end", () => {
    req.body = content;
    chunk = "";
    next();
  });
};

const readArgs = text => {
  let args = {};
  const splitKeyValue = pair => pair.split("=");
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  text
    .split("&")
    .map(splitKeyValue)
    .forEach(assignKeyValueToArgs);
  console.log(args);
  return args;
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

const filePathHandler = function(path) {
  if (path == "/") {
    return "./public/html/index.html";
  }
  return `./public${path}`;
};

const readFiles = function(req, res) {
  let filePath = filePathHandler(req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, "fileNotFound", 404);
    } else {
      send(res, data, 200);
    }
  });
};

const commentsInHtml = function(commentsList) {
  return commentsList
    .map(commentDetail => {
      commentDetail = commentDetail;
      return `<p>${commentDetail.date} ${commentDetail.name} ${
        commentDetail.comment
      }</p>`;
    })
    .join("");
};

const handleGuestBook = function(req, res, next) {
  let filePath = filePathHandler(req.url);
  fs.readFile(filePath, (err, data) => {
    let commentsList = commentsInHtml(comment.getComments());
    // console.log(123456, commentsList);
    if (err) send(res, "fileNotFound", 404);
    send(res, data + commentsList);
  });
};

const postInGuestBook = function(req, res, next) {
  let commentDetails = readArgs(req.body);
  commentDetails.date = new Date().toLocaleString();
  // comments.unshift(commentDetails);
  comment.addComments(commentDetails);
  fs.writeFile("./public/comments.json", comment.commentsInString(), err => {
    handleGuestBook(req, res, next);
  });
};

app.use(readBody);
app.use(logRequest);
app.post("/html/guestBook.html", postInGuestBook);
app.get("/html/guestBook.html", handleGuestBook);
app.use(readFiles);
app.use(sendNotFound);

module.exports = app.handleRequest.bind(app);
