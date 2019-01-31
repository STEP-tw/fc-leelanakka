const fs = require("fs");
const Sheeghra = require("./sheeghra");
const app = new Sheeghra();
const Comment = require("./comments.js");
const partialHtmls = require("./partialHtml.js");

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
      return `<p>${commentDetail.date} ${commentDetail.name} ${
        commentDetail.comment
      }</p>`;
    })
    .join("");
};

const redirect = function(res, location) {
  res.statusCode = 301;
  res.setHeader("Location", location);
  res.end();
};

const setCookie = function(res, cookie) {
  res.setHeader("Set-Cookie", "username=" + cookie);
};

const handleGuestBook = function(req, res, next) {
  let filePath = filePathHandler(req.url);
  const cookie = req.headers.cookie;
  let formToReplace = partialHtmls.partialHtmls.loginForm;
  if (cookie != undefined && cookie != "username=") {
    formToReplace = partialHtmls.partialHtmls.logOutForm(cookie.split("=")[1]);
  }
  fs.readFile(filePath, "utf8", (err, data) => {
    let commentsList = commentsInHtml(comment.getComments());
    let content = data.replace("##form##", formToReplace);
    send(res, content + commentsList + "</div>");
  });
};

const parseNameAndComment = text => text.split("+").join(" ");

const postInGuestBook = function(req, res, next) {
  let commentDetails = readArgs(req.body);
  commentDetails.name = req.headers.cookie.split("=")[1];
  commentDetails.comment = parseNameAndComment(commentDetails.comment);
  commentDetails.date = new Date().toLocaleString();
  comment.addComments(commentDetails);
  fs.writeFile("./public/comments.json", comment.commentsInString(), err => {
    send(res, commentsInHtml(res, comment.commentsInString()));
  });
};

const renderComments = function(req, res, next) {
  send(res, commentsInHtml(comment.getComments()));
};

const login = function(req, res, next) {
  setCookie(res, parseNameAndComment(req.body.split("=")[1]));
  redirect(res, "/html/guestBook.html");
};

const logout = function(req, res) {
  res.setHeader("Set-Cookie", 'username=; expires=""');
  redirect(res, "/html/guestBook.html");
};

app.use(readBody);
app.use(logRequest);
app.post("/login", login);
app.post("/logout", logout);
app.get("/html/guestBook.html", handleGuestBook);
app.get("/comments", renderComments);
app.post("/updateComment", postInGuestBook);
app.use(readFiles);
app.use(sendNotFound);

module.exports = app.handleRequest.bind(app);
