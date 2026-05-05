const express = require('express');
const { registrarUsuario } = require('../controllers/userController');

const router = express.Router();

router.post('/registro', registrarUsuario);

module.exports = router;
