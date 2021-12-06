const api = require('../services/api');

const forecast = async (name, callback) => {
    await api.get('forecast', {
        params: {
            access_key: "2aad0912ed38fe2dc11619e86b7883c6",
            query: encodeURIComponent(name),
            units: "m"
        }
    }).then(response => {
        let newDate = new Date()
        let day = String(newDate.getDate() - 1).padStart(2, '0');
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let currentDate = year + "-" + month + "-" + day;

        let information = {
            id: -1,
            cityName: "",
            temperature: "",
            sunriseHour: "",
            sunsetHour: "",
            image: ""
        }

        try {
            information.cityName = name;
            information.temperature = response.data.current.temperature;
            information.image = response.data.current.weather_icons;

            for (var key in response.data.forecast) { 
                information.sunriseHour = response.data.forecast[key].astro.sunrise;
                information.sunsetHour = response.data.forecast[key].astro.sunset;
            } 
        } catch (e) {
            console.log("Error: " + e)
        }

        callback(undefined, information)
    })
};

module.exports = { forecast }
