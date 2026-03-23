const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/clientesController');


// GET 
router.get('/', ClienteController.listarTodos);

// GET /clientes/nome/:nome
router.get('/nome/:nome', ClienteController.buscarPorNome);

// GET por ID
router.get('/:id', ClienteController.buscarPorId);

// POST 
router.post('/', ClienteController.criar);

// PUT
router.put('/:id', ClienteController.atualizar);

// DELETE 
router.delete('/:id', ClienteController.deletar);

//exportando
module.exports = router;
