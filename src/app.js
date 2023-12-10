
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const syncDatabase = require('./sync-db')
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const matchRoutes = require('./routes/matchRoutes');
const standingRoutes = require('./routes/standingRoutes');
const userRoutes = require('./routes/userRoutes');
const teamPlayerRoutes = require('./routes/teamPlayerRoutes');

app.use(bodyParser.json());

app.use('/api/players', playerRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/standings', standingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/team-players', teamPlayerRoutes);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}🚀`);
  console.log(`Acessar http://localhost:${port}`);

  await syncDatabase();
});

process.on('SIGINT', async () => {
    console.log('Encerrando o servidor...');
    await syncDatabase();
    server.close(() => {
      console.log('Servidor encerrado.');
      process.exit(0);
    })
});