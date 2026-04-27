const pool = require('../config/database');

//get geral
async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM produtos ORDER BY id'
  );
  
  return result.rows;
}

//get por id
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM produtos WHERE id = $1',
    [id] 
  );
  
  return result.rows[0];
}

//post
async function criar(dados) {
  const { nome,preco,estoque,categoria } = dados;
  
  const sql = `
    INSERT INTO produtos ( nome, preco,estoque,categoria )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, preco,estoque,categoria]
  );
  
  return result.rows[0];
}

//put
async function atualizar(id, dados) {
  const { nome, preco,estoque,categoria} = dados;
  
  const sql = `
    UPDATE produtos
    SET nome = $1, preco = $2, estoque = $3, categoria = $4
    WHERE id = $5
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, preco,estoque,categoria, id]
  );
 
  return result.rows[0] || null;
}

//delete
async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM produtos WHERE id = $1',
    [id]
  );
  
  return result.rowCount > 0;
}

//buscar por nome
async function buscarPorNome(nome) {
  const sql = 'SELECT * FROM produtos WHERE nome ILIKE $1';
  
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
