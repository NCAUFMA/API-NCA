const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importando rotas
const getProjects = require('./api/getProjects');
const getSecretKeys = require('./api/getSecretKeys');
const submitMembro = require('./api/submitMembro');
const submitNoticias = require('./api/submitNoticias');
const submitProjeto = require('./api/submitProjeto');
const hashPassword = require('./api/hashPassword');
const verifyPassword = require('./api/verifyPassword');


// Definindo rotas
app.get('/api/getProjects', getProjects);
app.get('/api/getSecretKeys', getSecretKeys);
app.post('/api/submitMembro', submitMembro);
app.post('/api/submitNoticias', submitNoticias);
app.post('/api/submitProjeto', submitProjeto);
app.post('/api/hashPassword', hashPassword);
app.post('/api/verifyPassword', verifyPassword);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
