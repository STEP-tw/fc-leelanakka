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
      console.log(comments);
      let commentsDiv = document.getElementById("comments");
      commentsDiv.innerHTML = comments;
    });
};
