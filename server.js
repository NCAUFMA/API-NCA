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
const getNoticias = require('./api/getNoticias');
const getMembros =  require('./api/getMembros');
const getLaboratorios = require('./api/getLaboratorios');
const getSecretKeys = require('./api/getSecretKeys');
const submitMembro = require('./api/submitMembro');
const submitNoticias = require('./api/submitNoticias');
const submitProjeto = require('./api/submitProjeto');
const hashPassword = require('./api/hashPassword');
const verifyPassword = require('./api/verifyPassword');


// Definindo rotas
app.get('/api/getProjects', getProjects);
app.get('/api/getNoticias', getNoticias);
app.get('/api/getMembros', getMembros);
app.get('/api/getLaboratorios', getLaboratorios);
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
