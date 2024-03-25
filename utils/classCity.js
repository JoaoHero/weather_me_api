
// Importando as variáveis de ambiente
require("dotenv").config();
// Importando os erros mapeados
const CUSTOM_ERROR_CODES = require("./errorCode");

class City {
    constructor() {
        this.urlGoogleApi = "https://maps.googleapis.com/maps/api/geocode/json";
        this.keyGoogleApi = process.env.KEY_GOOGLE_API;
        this.keyWeatherApi = process.env.KEY_WEATHER_API;
    };

    async getLatitudeLongitude(city) {
        const url = `${this.urlGoogleApi}?address=${encodeURIComponent(city)}&key=${this.keyGoogleApi}`;

        const response = await fetch(url);

        if(!response.ok) {
            return { error: true, cod: CUSTOM_ERROR_CODES.SERVER_ERROR };
        };

        const data = await response.json();

        if(data.status === "ZERO_RESULTS") {
            return { error: true, cod: CUSTOM_ERROR_CODES.ZERO_RESULTS };
        };

        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        console.log(latitude, longitude)

        return { latitude, longitude };
    }

    async weather(cityName) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${this.keyWeatherApi}&lang=pt_br`);

        if(!response.ok) {

            if(response.status === 404) {
                return { error: true, cod: CUSTOM_ERROR_CODES.ZERO_RESULTS };
            }

            return { error: true, cod: CUSTOM_ERROR_CODES.SERVER_ERROR };
        };

        const data = await response.json();

        return data;
    };

    async weatherByLatitudeLongitude(latitude, longitude) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.keyWeatherApi}`);

        if(!response.ok) {
            return { error: true, cod: CUSTOM_ERROR_CODES.SERVER_ERROR };
        };

        const data = await response.json();

        if(data.error) {
            if(data.error.cod === "wrong latitude"){
                return { error: true, cod: CUSTOM_ERROR.ZERO_RESULTS };
            };

            if(data.error.cod){
                return { error: true, cod: CUSTOM_ERROR.GENERIC_API_ERROR };
            };
        };

        return data;
    }
};

module.exports = City;