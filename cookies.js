function getCookiesAsObjects() {
    var cookieString = document.cookie;
  
    var cookiesArray = cookieString.split("; ");
  
    var result = {};
  
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookieElement = cookiesArray[i];
  
      var cookieDataArray = cookieElement.split("=");
  
      var cookieName = cookieDataArray[0];
      var cookieValue = cookieDataArray[1];
  
      result[cookieName] = cookieValue;
    }
    return result;
  }
  
  var cookiesObject = getCookiesAsObjects();
  
  const radios = document.getElementsByName("temperature");
  
  var savedTemperatureCookie = cookiesObject.temperature;
  
  for (var i = 0; i < radios.length; i++) {
    var radioElement = radios[i];
  
    if (radioElement.value === savedTemperatureCookie) {
      radioElement.checked = "checked";
    }
  
    radioElement.addEventListener("click", function(event) {
      document.cookie = "temperature= " + event.target.value;
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
        if (document.getElementById("celsius").checked) {
          p.innerText =
            "The temperature in Cluj-Napoca is " +
            response.current_observation.feelslike_c +
            "C";
        } else if (document.getElementById("fahrenheit").checked) {
          p.innerText =
            "The temperature in Cluj-Napoca is " +
            response.current_observation.feelslike_f +
            "F";
        }
      }
    });
  });
  