const axios = require('axios');

const api  = axios.create ({
    baseURL: 'http://api.weatherstack.com/'
})

module.exports = api;