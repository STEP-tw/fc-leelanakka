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

const convertToHtml = function(commentsDetails) {
  return commentsDetails
    .map(commentData => {
      commentData = JSON.parse(commentData);
      let date = new Date(commentData.date).toLocaleString();
      return `<p>${date} <b>${commentData.name}</b>
		${commentData.comment}</p>`;
    })
    .join("");
};

const updateComments = function() {
  let comment = document.getElementById("comment").value;
  fetch("/updateComment", {
    method: "POST",
    body: `comment=${comment}`
  }).then(comments => {
    let commentsDiv = document.getElementById("comments");
    commentsDiv.innerHTML = convertToHtml(comments);
  });
  document.getElementById("comment").value = "";
};
