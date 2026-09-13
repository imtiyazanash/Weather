const apiKey = "18a1415d10a5254f618f0d01adbb3022";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const weatherResult = document.getElementById("weatherResult");

    if (city === "") {
        error.textContent = "Please enter a city name.";
        weatherResult.style.display = "none";
        return;
    }

    loading.textContent = "Loading...";
    error.textContent = "";
    weatherResult.style.display = "none";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent =
            data.name;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        const condition =
            data.weather[0].main.toLowerCase();

        let icon = "☁️";

        if (condition.includes("clear")) {
            icon = "☀️";
        }
        else if (condition.includes("cloud")) {
            icon = "☁️";
        }
        else if (condition.includes("rain")) {
            icon = "🌧️";
        }
        else if (condition.includes("thunderstorm")) {
            icon = "⛈️";
        }
        else if (condition.includes("snow")) {
            icon = "❄️";
        }
        else if (condition.includes("mist") ||
                 condition.includes("fog")) {
            icon = "🌫️";
        }

        document.getElementById("weatherIcon").textContent = icon;

        loading.textContent = "";

        weatherResult.style.display = "block";

    }
    catch (errorMessage) {

        loading.textContent = "";

        error.textContent =
            "City not found. Please enter a valid city name.";

        weatherResult.style.display = "none";
    }
}
