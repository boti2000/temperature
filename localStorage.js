var radioButtons = document.getElementsByName("temperature");

var savedTemperatureLocalStorage = localStorage.getItem("temperature");

for (var i = 0; i < radioButtons.length; i++) {
  var radioElement = radioButtons[i];
  if (radioElement.value === savedTemperatureLocalStorage) {
    radioElement.checked = "checked";
  }

  radioElement.addEventListener("click", function(event) {
    localStorage.setItem("temperature", event.target.value);
  });
}

var weatherUrl =
  "https://api.wunderground.com/api/cfbfc5f603141e07/conditions/q/RO/Cluj_Napoca.json ";

var button = document.getElementById("getTemperatureButton");
button.addEventListener("click", function() {
  $.ajax({
    url: weatherUrl,
    method: "GET",
    success: function(response) {
      var p = document.getElementById("temperature");
      if (localStorage.temperature === "celsius") {
        p.innerText =
          "The temperature in Cluj-Napoca is " +
          response.current_observation.feelslike_c +
          "C";
      } else if (localStorage.temperature === "fahrenheit") {
        p.innerText =
          "The temperature in Cluj-Napoca is " +
          response.current_observation.feelslike_f +
          "F";
      }
    }
  });
});
