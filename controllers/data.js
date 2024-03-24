// Inicializando o express
const express = require('express');
// Chamando rotas do express
const router = express.Router();
// Importando a classe criada getDate em utils
const GetDate = require("../utils/getDate");

// Criado rota para buscar a data e o horário
router.get("/date", (req, res) => {
    try {
        // Instanciando a classe
        const date = new GetDate();

        // Parando o processamento e retornando o código de sucesso
        return res.status(200).json({
            error: false,
            time: date.returnTime(),
            date: date.returnDate()
        });

    }catch(err) {
        // Parar o processamento e retornar o código de erro
        return res.status(400).json({
            error: true,
            message: err.message
        });
    };
});

// Criando a rota login
module.exports = router;