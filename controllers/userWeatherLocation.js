// Inicializando o express
const express = require('express');
// Chamando rotas do express
const router = express.Router();
// Importando a classe SearchCity criada em utils
const City = require("../utils/classCity");
// Importando os erros mapeados
const CUSTOM_ERROR_CODES = require("../utils/errorCode");

router.post("/userWeatherLocation", async(req, res) => {
    try {
        let { userLatitude } = req.body;
        let { userLongitude } = req.body;

        const city = new City();

        const weatherCity = await city.weatherByLatitudeLongitude(userLatitude, userLongitude);

        return res.status(200).json({
            error: false,
            weatherResult: weatherCity
        });
        
    }catch(err) {
        return res.status(500).json({
            error: true,
            message: `Erro interno ao tentar buscar as informações no servidor: ${err}`,
            cod: CUSTOM_ERROR_CODES.SERVER_ERROR
        });
    };
});

module.exports = router;