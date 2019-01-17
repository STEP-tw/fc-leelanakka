const hideImage = function(model) {
  let jar = document.getElementById("wateringJar");
  jar.style.visibility = model;
};
const hide = () => {
  hideImage("hidden");
  setTimeout(hideImage.bind(null, "visible"), 1000);
};
