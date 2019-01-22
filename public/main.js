const hideImage = function(model) {
  let jar = document.getElementById("wateringJar");
  jar.style.visibility = model;
};

const hide = () => {
  hideImage("hidden");
  setTimeout(hideImage.bind(null, "visible"), 1000);
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

const refreshComments = function() {
  fetch("../comments.json")
    .then(function(res) {
      return res.text();
    })
    .then(function(comments) {
      let commentsDiv = document.getElementById("comments");
      comments = JSON.parse(comments);
      comments = commentsInHtml(comments);
      commentsDiv.innerHTML = comments;
    });
};
