// sync-db.js
const sequelize = require('./config/sequelize.config');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Database sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro na sincronização do Banco de dados:', error);
  } 
}

module.exports = syncDatabase;
