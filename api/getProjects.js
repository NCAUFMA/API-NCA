const utils = require('../util.js');

module.exports = (req, res) => {
const allowedOrigins = ['http://localhost:4000', 'https://ncaufma.github.io'];
  const origin = req.headers.origin;

  // Verifique se a origem da solicitação está na lista de origens permitidas
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
      res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens, mas pode ser ajustado
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Permite GET e OPTIONS
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permite cabeçalhos específicos

  if (req.method === 'OPTIONS') {
    // Responde a preflight requests
    res.status(200).end();
    return; // Finaliza a execução da função após responder ao preflight
  } 

  if (req.method === 'GET') {
    const doc = utils.getAllProjectsInfo();
    if (doc) {
        res.status(200).json({ message: doc });
    } else {
        res.status(400).json({ message: 'Problema ao retornar projetos' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
