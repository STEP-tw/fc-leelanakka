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

const openCommentsPage = function() {
  let nameDiv = document.getElementById("_name");
  let commentFormDiv = document.getElementById("commentDiv");
  let loginDiv = document.getElementById("login");
  loginDiv.onclick = location.reload.bind(location);
  if (nameDiv.value == "") {
    return;
  }
  loginDiv.innerText = "Logout";
  commentFormDiv.innerHTML = `Comment: <input name="comment" type="text"  class="comment"></input>`;
};
