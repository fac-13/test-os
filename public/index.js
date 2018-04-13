const results = document.getElementById("results");

function fetch(method, url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    if (xhr.status == 200) {
      const response = xhr.responseText;
      return callback(null, response);
    } else {
      callback("Server error" + xhr.status);
    }
  });
  xhr.addEventListener("error", function() {
    callback("Server did not respond");
  });
  xhr.open(method, url, true);
  if (data) xhr.send(data);
  else xhr.send();
}

fetch("GET", "/comments", null, displayComments);

function displayComments(err, data) {
  data = JSON.parse(data);
  if (err) console.log(err);

  data.forEach(function(comment) {
    console.log(comment);
    results.innerHTML = '<p>' + comment + '</p>';
  });
}
