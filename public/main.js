const hideImage = function(model) {
  let jar = document.getElementById("wateringJar");
  jar.style.visibility = model;
};

const hide = () => {
  hideImage("hidden");
  setTimeout(hideImage.bind(null, "visible"), 1000);
};

const refreshComments = function() {
  fetch("/comments")
    .then(function(res) {
      return res.text();
    })
    .then(function(comments) {
      let commentsDiv = document.getElementById("comments");
      commentsDiv.innerHTML = comments;
    });
};

const updateComments = function() {
  let comment = document.getElementById("comment").value;
  fetch("/updateComment", {
    method: "POST",
    body: `comment=${comment}`
  })
    .then(response => response.text())
    .then(comments => {
      let commentsDiv = document.getElementById("comments");
      commentsDiv.innerHTML = comments;
    });
  document.getElementById("comment").value = "";
};

window.onload = refreshComments;
