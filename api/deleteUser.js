const admin = require('firebase-admin');

// Configura o Firebase Admin com variáveis de ambiente
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sitenca-c7704.firebaseio.com" // Use a URL que você obteve
});

const express = require('express');
const app = express();

app.use(express.json());

app.post('/deleteUser', async (req, res) => {
  const userId = req.body.email;

  try {
    // Exclui o documento do Firestore
    await admin.firestore().collection('users').doc(userId).delete();
    console.log(`Documento Firestore do usuário ${userId} excluído.`);

    // Exclui o usuário do Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(userId);
    await admin.auth().deleteUser(userRecord.uid);
    console.log(`Usuário ${userId} excluído do Firebase Authentication.`);

    res.status(200).send({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).send({ message: 'Erro ao excluir usuário.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
