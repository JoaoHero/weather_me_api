// Inicializando o express
const express = require('express');
// Chamando rotas do express
const router = express.Router();
// Importando a classe SearchCity criada em utils
const City = require("../utils/classCity");
// Importando os erros mapeados
const CUSTOM_ERROR_CODES = require("../utils/errorCode");

// Criado rota para buscar a data e o horário
router.post("/weatherCity", async (req, res) => {
    try {
        // Obtendo os dados destruturados do corpo da requisição
        const { cityName } = req.body;

        if(!cityName || typeof cityName != "string") {
            return res.status(422).json({
                error: true,
                message: "Favor inserir o nome da cidade.",
                cod: CUSTOM_ERROR_CODES.INVALID_INPUT
            });
        };

        // Instanciando a classe
        const city = new City();

        const weather = await city.weather(cityName);

        if(weather.error) {
            // Parando o processamento e retornando o código de erro
            return res.status(404).json({
                error: true,
                message: "Cidade não localizada",
                cod: CUSTOM_ERROR_CODES.ZERO_RESULTS,
            });
        };

        // Parando o processamento e retornando o código de sucesso
        return res.status(200).json({
            error: false,
            weatherResult: weather
        });

    }catch(err) {
        return res.status(500).json({
            error: true,
            message: `Erro interno ao tentar buscar as informações no servidor: ${err}`,
            cod: CUSTOM_ERROR_CODES.SERVER_ERROR
        });
    };
});

// Criando a rota login
module.exports = router;