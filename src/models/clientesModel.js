const pool = require('../config/database');

//get geral
async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM clientes ORDER BY id'
  );
  
  return result.rows;
}

//get por id
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM clientes WHERE id = $1',
    [id] 
  );
  
  return result.rows[0];
}

//post
async function criar(dados) {
  const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro  } = dados;
  
  const sql = `
    INSERT INTO clientes ( nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro ]
  );
  
  return result.rows[0];
}

//put
async function atualizar(id, dados) {
  const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro  } = dados;
  
  const sql = `
    UPDATE clientes
    SET nome = $1, cpf = $2, telefone = $3, email = $4, datanasc = $5, rua = $6, numeroCasa = $7, bairro = $8
    WHERE id = $9
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro, id]
  );
 
  return result.rows[0] || null;
}

//delete
async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM clientes WHERE id = $1',
    [id]
  );
  
  return result.rowCount > 0;
}

//buscar por nome
async function buscarPorNome(nome) {
  const sql = 'SELECT * FROM clientes WHERE nome ILIKE $1';
  
  const result = await pool.query(
    sql,
    [`%${nome}%`] 
  );
  
  return result.rows;
}

//exportando
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorNome
};
