
let cityInput = document.querySelector(".container .search-box input");
let weatherLocation = document.querySelector(".container .weather-location");
let weatherImg = document.querySelector(".container .weather-img img");
let temp = document.querySelector(".container .temp");
let weatherMain = document.querySelector(".container .weather-main-1");
let otherDetails = document.querySelector(".container .other-details");
let forecastBox = document.querySelector(".container .forecast-box");

let apiKey = "672e4d71d2f56b4a7295468f4e9e929a";

let getWeatherDetails = (city) =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url).then((res) => res.json()).then((data) =>{
        weatherImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weatherMain.innerHTML = data.weather[0].main;
        weatherLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.name}`;
        temp.innerHTML = `${data.main.temp}&#176;`;

        otherDetails.innerHTML = `
        <div>
                    <span>Feels Like</span>
                    <p>${data.main.feels_like}&#176;</p>
                </div>
                <div>
                    <span>Min Temp</span>
                    <p>${data.main.temp_min}&#176;</p>
                </div>
                <div>
                    <span>Humidity</span>
                    <p>${data.main.humidity}%</p>
                </div>
                <div>
                    <span>Wind Speed</span>
                    <p>${data.wind.speed}Km/H</p>
                </div>
                <div>
                    <span>Max Temp</span>
                    <p>${data.main.temp_max}&#176;</p>
                </div>
                <div>
                    <span>Pressure</span>
                    <p>${data.main.pressure}mbar</p>
                </div>
        `;
    })
}

cityInput.addEventListener("keyup", (e)=>{
    if(e.key == "Enter" && e.target.value != ""){
        getWeatherDetails(cityInput.value);
        getWeatherForecast(cityInput.value);
    }
})

let getWeatherForecast = (city) =>{
    const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(forecast_url).then((res) => res.json()).then((data) =>{
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast =>{
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        })
        forecastBox.innerHTML = "";
        fiveDaysForecast.forEach((weatherItem, index) => {
            forecastBox.insertAdjacentHTML("beforeend", createForecastCard(weatherItem, index));
        });
    })
}

let createForecastCard = (item, index) =>{
    if(index === 0){
        return ``;
    }
    else{
        let forecastImage = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
        let forecastD = new Date(item.dt_txt);
        let forecastYear = forecastD.getFullYear();
        let forecastMonth = forecastD.getMonth()+1;
        let forecastDate = forecastD.getDate();

        forecastMonth = forecastMonth < 10 ? "0" + forecastMonth : forecastMonth;
        forecastDate = forecastDate < 10 ? "0" + forecastDate : forecastDate;

        return `<div class="card">
                    <p class="forecast-date">${forecastYear}-${forecastMonth}-${forecastDate}</p>
                    <div class="forecast-img">
                        <img src="${forecastImage}" alt="Demo">
                    </div>
                    <h5 class="forecast-temp">${item.main.temp}&#176;</h5>
                </div>`;
    }
}

getWeatherForecast(cityInput.value);
getWeatherDetails(cityInput.value);
