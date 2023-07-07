window.onload = function () {
  document.querySelector(".container").classList.add("active");
  document.getElementById("search-box").value = "";
  const searchBox = document.getElementById("search-box");
  const searchButton = document.getElementById("search-button");
  const weatherInfo = document.getElementById("weather-info");
  searchButton.addEventListener("click", () => {
    let cityName = searchBox.value;
    const apiKey = "2fb2c57a6255bd20f07aa856d18ef498";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.main) {
          const temperature = Math.round(data.main.temp);
          const description = data.weather[0].description;
          const accessKey = "Sotwa99Pz-DbC9UnPQSSjbk9Udrx5ISfDpWV2ZV7o3k";

          // Set the endpoint URL for the desired API request
          const endpointURL = "https://api.unsplash.com/photos/random";

          // Set the search query parameter
          const result = description.replace(/ /g, ",");
          const query = `${result},weather`;
          const searchURL = `${endpointURL}?query=${query}&exclude=people`;
          console.log(`URL : ${searchURL}`);

          // Set the headers object with your access key
          const headers = {
            Authorization: `Client-ID ${accessKey}`,
          };

          const body = document.querySelector("body");

          // Make the API request using fetch
          fetch(searchURL, { headers })
            .then((response) => response.json())
            .then((imageData) => {
              // Extract the image URL from the API response
              const imageUrl = imageData.urls.regular;

              // Set the background image of the HTML element
              body.classList.add("transition-bg");
              body.style.background = `url(${imageUrl}) no-repeat center center fixed`;
              body.style.backgroundSize = "cover";
            })
            .catch((error) => {
              console.log(error.message);
            });

          const iconCode = data.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
          cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
          weatherInfo.innerHTML = `
                <h2>${cityName}</h2>
                <div>
                    <img src="${iconUrl}" alt="${description}"><br>
                    <h4 class ='light'>${temperature}&deg;C</h5>
                    <h4 class ='light'>${description}</h5>
                </div>
            `;
        } else {
          weatherInfo.innerHTML = `<p>Error: Unable to get weather data for ${cityName}</p>`;
        }
      })
      .catch((error) => {
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        console.log(error.message);
      });

    searchBox.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
      }
    });
    window.onbeforeunload = function () {
      localStorage.clear();
    };
  });
};
