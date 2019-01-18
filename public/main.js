const hideImage = function(model) {
  let jar = document.getElementById("wateringJar");
  jar.style.visibility = model;
};

const hide = () => {
  hideImage("hidden");
  setTimeout(hideImage.bind(null, "visible"), 1000);
};

const insertComments = function() {
  let text = "";
  let form = document.getElementById("form");
  let date = new Date().toLocaleString().split(" ")[0];
  for (let index = 0; index < form.length - 1; index++) {
    text += date+ form.elements[index].value;
  }
  document.getElementById("comments").innerText = text;
  // "finally it came to comments section";
};
