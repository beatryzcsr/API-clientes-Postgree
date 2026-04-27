const express = require('express');
const router = express.Router();

const ProdutoController = require('../controllers/produtosController');


// GET 
router.get('/', ProdutoController.listarTodos);

router.get('/buscar/nome/:nome', ProdutoController.buscarPorNome);

router.get('/buscar/id/:id', ProdutoController.buscarPorId);


// POST 
router.post('/', ProdutoController.criar);

// PUT
router.put('/:id', ProdutoController.atualizar);

// DELETE 
router.delete('/:id', ProdutoController.deletar);

//exportando
module.exports = router;
