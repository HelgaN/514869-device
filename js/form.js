"use strict";

var scale = document.querySelector(".scale");
var bar = document.querySelector(".bar");
var toggleMin = document.querySelector(".toggle-min");
var toggleMax = document.querySelector(".toggle-max");
var minPrice = document.querySelector("input[name=min-price]");
var maxPrice = document.querySelector("input[name=max-price]");

toggleMin.style.zIndex = "10";
toggleMax.style.zIndex = "20";

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

var barWidth = bar.offsetWidth;

toggleMin.addEventListener("mousedown", function(evt) {
  evt.preventDefault();
  bar.style.position = "relative";
  var startCoordsMin = evt.pageX - bar.offsetLeft;

  var onMouseMoveMin = function(evtMove) {
    evtMove.preventDefault();
    var coordsMax = getCoords(toggleMax);
    var coordsMin = getCoords(toggleMin);
    var barCoords = getCoords(bar);
    var shiftMin;

    if (coordsMin.left + toggleMin.offsetWidth >= coordsMax.left) {
      if (evtMove.pageX <= startCoordsMin) {
        shiftMin = startCoordsMin - evtMove.pageX;
        toggleMin.style.left = shiftMin + "px";
        bar.style.left = shiftMin + "px";
        bar.style.width = (parseInt(barWidth - shiftMin) + "px");
      }
    } else {
      shiftMin = evtMove.pageX - startCoordsMin;

      toggleMin.style.left = shiftMin + "px";
      bar.style.left = shiftMin + "px";
      bar.style.width = parseInt(toggleMax.offsetLeft) - shiftMin + "px";  /*(parseInt(barWidth - shiftMin) + "px")*/ ;
      if (toggleMin.style.left > 190) {
        toggleMin.style.left = "190px";
        bar.style.width = "190px"
      }

      if(parseInt(bar.style.left) <= 0) {
        toggleMin.style.left = "0";
        bar.style.left = "0";
        bar.style.width = coordsMax.left - coordsMin.left + "px";
      }
      minPrice.value = (parseInt(toggleMin.style.left) * 100);
    }
  }
  var onMouseUp = function() {
    document.removeEventListener("mousemove", onMouseMoveMin);
    document.removeEventListener("mouseup", onMouseUp);
  }
  document.addEventListener("mousemove", onMouseMoveMin);
  document.addEventListener("mouseup", onMouseUp);
});


toggleMax.addEventListener("mousedown", function(evt2) {
  evt2.preventDefault();
  var startCoordsMax = evt2.pageX - bar.offsetLeft - bar.offsetWidth; /* чтобы не скакол курсор при первом клике */
  var onMouseMoveMax = function(evt2) {
    evt2.preventDefault();
    var coordsMax = getCoords(toggleMax);
    var coordsMin = getCoords(toggleMin);
    var shiftMax;

    if (coordsMax.left - toggleMax.offsetWidth / 2 <= coordsMin.left) {
      if (evt2.pageX - bar.offsetLeft > startCoordsMax) {
        shiftMax = evt2.pageX - startCoordsMax;
        toggleMax.style.left = shiftMax + "px";
        bar.style.width = shiftMax + "px";
        if (parseInt(toggleMax.style.left) > 190 || parseInt(bar.style.width) > 190) {
          toggleMax.style.left = "190px";
          bar.style.width = "190px";
        }
        if (toggleMax.style.left < 0) {
          toggleMax.style.left = "0";
        }
      }
      bar.style.width = "0";
    } else {
      if (evt2.pageX > startCoordsMax) {
        shiftMax = evt2.pageX - startCoordsMax;
      } else {
        shiftMax = startCoordsMax - evt2.pageX;
      }
      toggleMax.style.left = shiftMax + "px";
      bar.style.width = toggleMax.offsetLeft - toggleMin.offsetLeft + "px";

      if (parseInt(toggleMax.style.left) > 190 || parseInt(bar.style.width) > 190 && toggleMin.style.left < 20) {
        toggleMax.style.left = "190px";
        bar.style.width = 190 - parseInt(toggleMin.style.left) + "px";
      }

      if (parseInt(bar.style.width) > 190) {
        bar.style.width = "190px";
      }

      maxPrice.value = (parseInt(toggleMax.style.left) * 100);
    }
  }

  var onMouseUp = function(evtUp) {
    document.removeEventListener("mousemove", onMouseMoveMax);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMoveMax);
  document.addEventListener("mouseup", onMouseUp);
});
