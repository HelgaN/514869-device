var mapLink = document.querySelector(".button-contacts-map");

var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-map-close");

mapLink.addEventListener("click", function (e) {
  e.preventDefault();
  mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function (e) {
  e.preventDefault();
  mapPopup.classList.remove("modal-show");
});

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.keyCode === 27) {
    if (mapPopup.classList.contains("modal-show")) {
      mapPopup.classList.remove("modal-show");
    }
  }
});
