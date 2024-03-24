// Inicializando o express
const express = require('express');
// Importando as políticas do servidor
const cors = require("cors");
// Criando o app com o express
app = express();
// Especificando a porta sendo utilizada
port = 8080;

//Middleware para analisar dados codificados em URL
app.use(express.urlencoded({
    extended: true
}));
// Middleware para permitir comunicação em json
app.use(express.json());
// Middleware para permitir requisições CORS
app.use(cors());

// Importando as controllers
dateRouter = require("./controllers/data");
cityRouter = require("./controllers/weatherCity");

// Rotas
app.use("/", dateRouter);
app.use("/", cityRouter);

// Servidor rodando na porta: localhost:8080
app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});