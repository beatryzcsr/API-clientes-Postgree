// Importar dotenv 
require("dotenv").config();

// Importar o Pool do PostgreSQL
const { Pool } = require("pg");


const pool = new Pool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASSWORD, 
  port: parseInt(process.env.DB_PORT), 
});



pool.connect((erro, client, release) => {
  if (erro) {
    console.error("❌ Erro ao conectar ao PostgreSQL:", erro.message);
    console.error("💡 Verifique suas credenciais no arquivo .env");
  } else {
    console.log("✅ Conectado ao PostgreSQL!");
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release(); // Devolver a conexão ao pool
  }
});


const criarTabela = async () => {
  const sql = `
 create table if not exists clientes (
id serial primary key,
nome varchar (50) not null,
cpf integer not null,
telefone varchar(14) not null,
email varchar (30) not null,
datanasc  TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
rua varchar (40) not null,
numeroCasa integer not null,
bairro varchar (40) not null
)
  `;

  try {
    await pool.query(sql);
    console.log("✅ Tabela clientes verificada/criada");
  } catch (erro) {
    console.error("❌ Erro ao criar tabela:", erro.message);
  }
};

criarTabela();

module.exports = pool;
