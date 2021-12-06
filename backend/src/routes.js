const express = require('express')
const routes = express.Router();
const {forecast} = require("./utils/weather.js");
const {saveLog} = require("./utils/log.js");

routes.get('/weather', async (request, response) => {
    const query = request.query;

    if(query.cities != undefined && query.cities !== ""){
        let cities = query.cities.split("|");
        
        let data = []; 

        for(let i = 0; i < cities.length; i++){
            await forecast(cities[i], async (error, information) => {
                if(error){
                    return response.json({
                        success: false,
                        errorMessage: "Tem de inserir pelo menos uma (1) cidade"
                    })
                }else{ 
                    information.id = i + 1;
                    information.cityName = cities[i];
                    data.push(information);
                }
            })
        }

        saveLog('/weather', request.socket.remoteAddress, cities);

        return response.json({
            success: true,
            data : data
        }); 
    }else{
        return response.json({
            success: false,
            errorMessage: "Tem de inserir pelo menos uma (1) cidade"
        })
    }
})

module.exports = routes;