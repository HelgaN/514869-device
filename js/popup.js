var buttonContacts = document.querySelector(".button-contacts");
var popupContacts = document.querySelector(".modal-feedback");
var closePopupContacts = document.querySelector(".modal-feedback-close");

var nameContact = popupContacts.querySelector(".feedback-name");
var mailContact = popupContacts.querySelector(".feedback-email");
var form = popupContacts.querySelector("form");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("name");
} catch (err) {
  isStorageSupport = false;
}

buttonContacts.addEventListener("click", function(e) {
  e.preventDefault();
  popupContacts.classList.add("modal-show");
  if (storage) {
    nameContact.value = storage;
    mailContact.focus();
  } else {
    nameContact.focus();
  }
});

closePopupContacts.addEventListener("click", function(e) {
  e.preventDefault();
  popupContacts.classList.remove("modal-show");
  popupContacts.classList.remove("modal-error");
});

form.addEventListener("submit", function(e) {
  if (!nameContact.value || !mailContact.value) {
    e.preventDefault();
    popupContacts.classList.remove("modal-error");
    popupContacts.offsetWidth = popupContacts.offsetWidth;
    popupContacts.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameContact.value);
    }
  }
});

window.addEventListener("keydown", function(e) {
  if (e.keyCode === 27) {
    e.preventDefault();
    if (popupContacts.classList.contains("modal-show")) {
      popupContacts.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});
