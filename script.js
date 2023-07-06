window.onload = function () {
    document.querySelector('.container').classList.add('active');
    document.getElementById('search-box').value = '';
    const searchBox = document.getElementById("search-box");
    const searchButton = document.getElementById("search-button");
    const weatherInfo = document.getElementById("weather-info");
    // function showMessage(duration) {
    //     const messageElement = document.getElementById("loading-icon-container");

    //     messageElement.style.display = "block";

    //     // Hide the message element after the specified duration
    //     setTimeout(function () {
    //         messageElement.style.display = "none";
    //     }, duration);
    // }
    // function hideMessage() {
    //     const messageElement = document.getElementById("loading-icon-container");
    //     messageElement.style.display = "none";
    // }
    searchButton.addEventListener("click", () => {
        // showMessage(800);
        const cityName = searchBox.value;
        const apiKey = "2fb2c57a6255bd20f07aa856d18ef498"; // replace with your API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.main) {
                    const temperature = Math.round(data.main.temp);
                    const description = data.weather[0].description;
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
                    console.log("ICON CODE : ", iconCode);
                    weatherInfo.innerHTML = `
                    <h2>${cityName}</h2>
                    <div>
                        <img src="${iconUrl}" alt="${description}">
                        <p>${temperature}&deg;C</p>
                        <p>${description}</p>
                    </div>
                `;
                } else {
                    weatherInfo.innerHTML = `<p>Error: Unable to get weather data for ${cityName}</p>`;
                }
            })
            .catch(error => {
                weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
            });
        // .finally(() => {
        //     hideMessage(); // hide loading icon when data is loaded
        // });
    });
    searchBox.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchButton.click();
        }
    });
    window.onbeforeunload = function () {
        localStorage.clear();
    }

};
