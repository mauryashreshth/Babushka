const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const weatherInfo = document.getElementById("weather-info");

searchButton.addEventListener("click", () => {
    const cityName = searchBox.value;
    const apiKey = "2fb2c57a6255bd20f07aa856d18ef498"; // replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.main) {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

                weatherInfo.innerHTML = `
                    <h2>${cityName}</h2>
                    <div>
                        <img src="${iconUrl}" alt="${description}">
                        <span>${temperature}&deg;C</span>
                    </div>
                    <p>${description}</p>
                `;
            } else {
                weatherInfo.innerHTML = `<p>Error: Unable to get weather data for ${cityName}</p>`;
            }
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    // fetch(url)
    // .then(response => response.json())
    // .then(data => {
    //     // your code to process the data
    // })
    // .catch(error => {
    //     console.log(error);
    // });
});
