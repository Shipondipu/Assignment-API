function fetchCountryData() {
    var countryName = document.getElementById("countryName").value.trim();
    if (!countryName) {
        alert("Please enter a country name!");
        return;
    }

    // Fetch country data from Rest Countries API
    var url = `https://restcountries.com/v3.1/name/${countryName}`;
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to fetch country data. Response status: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            displayCountryData(data);
        })
        .catch(function (error) {
            console.error("Error:", error);
            document.getElementById("countryData").innerHTML = `<div class="alert alert-danger">
                Failed to fetch country data. Please check the country name and try again.
            </div>`;
        });
}

function displayCountryData(countries) {
    var countryDataDiv = document.getElementById("countryData");
    countryDataDiv.innerHTML = "";

    countries.forEach(function (country) {
        var countryCard = document.createElement("div");
        countryCard.className = "country-card col-md-4";

        countryCard.innerHTML = `
            <img class="country-flag" src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <h3>${country.name.common}</h3>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <button class="btn btn-secondary" onclick="fetchWeatherData('${country.capital ? country.capital[0] : ""}', '${country.name.common}')">
                More Details
            </button>
        `;

        countryDataDiv.appendChild(countryCard);
    });
}

function fetchWeatherData(city, countryName) {
    if (!city) {
        alert("No capital city found for this country.");
        return;
    }

    var weatherApiKey = "09390724b17442729dc35320240312"; // WeatherAPI key from earlier tasks
    var url = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to fetch weather data. Response status: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            displayWeatherData(data, countryName);
        })
        .catch(function (error) {
            console.error("Error:", error);
            alert("Failed to fetch weather data. Please check the API key and try again.");
        });
}

function displayWeatherData(weatherData, countryName) {
    alert(
        `Weather in ${countryName}:\n` +
        `Temperature: ${weatherData.current.temp_c}°C\n` +
        `Condition: ${weatherData.current.condition.text}\n` +
        `Humidity: ${weatherData.current.humidity}%`
    );
}