function downloadJSAtOnload() {
  var elementOne = document.createElement("script");
  elementOne.src = "https://code.jquery.com/jquery-3.4.1.slim.min.js";
  document.body.appendChild(elementOne);

  var elementTwo = document.createElement("script");
  elementTwo.src =
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js";
  document.body.appendChild(elementTwo);
}

if (window.addEventListener)
  window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent) window.attachEvent("onload", downloadJSAtOnload);
else window.onload = downloadJSAtOnload;
