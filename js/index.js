// Get the users location and store it in variables
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        $(".header")
            .fadeOut(function() {
                $("h1").html("HOW'S THE WEATHER?");
            })
            .css("opacity", "0")
            .fadeIn();
        getTemperature(lon, lat);
    });
}

function getTemperature(lon, lat) {
    // Fade in header
    $(".header").fadeTo(1000, 1);
    $(".background")
        .delay(500)
        .fadeTo(4000, 1);

    // Get FCC Weather API
    $.getJSON(
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
            lat +
            "&lon=" +
            lon,
        function(json) {
            // Add temperature from JSON
            $(".temperature")
                .delay(250)
                .fadeTo(1000, 1)
                .append(
                    // Print current temperature
                    `<p>` +
                        Math.ceil(json.main.temp) +
                        `<span class="small">°C</span></p>` /*+
      // Print Weather icon
      '<img src="' + json.weather[0].icon + '" alt="Weather Icon" />'*/
                );

            // Add JSON Elements to weather info container
            $(".container").html(
                // Print current weather
                `<p class="weather-text"><span class="weather-text-highlight">Weather:</span> ` +
                    json.weather[0].main +
                    `, ` +
                    json.weather[0].description +
                    `</p>` +
                    // Print current City & Country
                    `<p class="weather-text"><span class="weather-text-highlight">City:</span> ` +
                    json.name +
                    ", " +
                    json.sys.country +
                    `</p>` +
                    // Print min and max temperatures
                    `<p class="weather-text"><span class="weather-text-highlight">Min:</span> ` +
                    Math.ceil(json.main.temp_min) +
                    `°C <span class="weather-text-highlight">Max:</span> ` +
                    Math.ceil(json.main.temp_max) +
                    `°C</p>` +
                    // Print wind speed
                    `<p class="weather-text"><span class="weather-text-highlight">Wind speed:</span> ` +
                    json.wind.speed +
                    ` Bft</p>`
            );

            // Fade in weather infos
            $(".weather-data").fadeTo(500, 1);
            $(".weather-text")
                .delay(1000)
                .fadeTo(2000, 1);
            $(".weather-text-highlight")
                .delay(1000)
                .fadeTo(2000, 1);

            //Change background image depending on weather
            if (json.weather[0].main.includes("Rain")) {
                $(".background").css({
                    background:
                        "url(https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?auto=format&fit=crop&w=1400)",
                    "background-size": "cover",
                    "background-repeat": "no-repeat"
                });
            } else if (json.weather[0].main.includes("Clouds")) {
                $(".background").css({
                    background:
                        "url(https://images.unsplash.com/photo-1504963540949-6c4b7f41810b?auto=format&fit=crop&w=1400)",
                    "background-size": "cover",
                    "background-repeat": "no-repeat"
                });
            } else if (json.weather[0].main.includes("Sun")) {
                $(".background").css({
                    background:
                        "url(https://images.unsplash.com/photo-1504803900752-c2051699d0e8?auto=format&fit=crop&w=1400)",
                    "background-size": "cover",
                    "background-repeat": "no-repeat"
                });
            } else if (json.weather[0].main.includes("Snow")) {
                $(".background").css({
                    background:
                        "url(https://images.unsplash.com/photo-1513115044-a6f1731b8175?auto=format&fit=crop&w=1400)",
                    "background-size": "cover",
                    "background-repeat": "no-repeat"
                });
            }
        }
    );
}
