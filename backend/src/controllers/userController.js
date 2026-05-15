const bcrypt = require('bcryptjs');
const User = require('../models/User');

function validarRegistro({ nombre = '', correo = '', contrasena = '' }) {
  const errores = [];
  const nombreLimpio = nombre.trim();
  const correoLimpio = correo.trim().toLowerCase();

  if (!nombreLimpio) errores.push('El nombre es obligatorio.');
  else if (nombreLimpio.length < 3) errores.push('Minimo 3 caracteres.');
  else if (nombreLimpio.length > 60) errores.push('Maximo 60 caracteres.');
  else if (!/^[\p{L}\s'-]+$/u.test(nombreLimpio)) errores.push('Solo letras y espacios.');

  if (!correoLimpio) errores.push('El correo electronico es obligatorio.');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) errores.push('Ingresa un correo valido.');

  if (!contrasena) errores.push('La contrasena es obligatoria.');
  else {
    if (contrasena.length < 8) errores.push('Minimo 8 caracteres.');
    if (!/[A-Z]/.test(contrasena)) errores.push('Al menos una letra mayuscula.');
    if (!/\d/.test(contrasena)) errores.push('Al menos un numero.');
  }

  return { errores, nombreLimpio, correoLimpio };
}

async function registrarUsuario(req, res, next) {
  try {
    const { nombre, correo, contrasena } = req.body;
    const { errores, nombreLimpio, correoLimpio } = validarRegistro({ nombre, correo, contrasena });

    if (errores.length) {
      return res.status(400).json({
        message: 'Datos de registro invalidos.',
        errors: errores
      });
    }

    const usuarioExistente = await User.findOne({ correo: correoLimpio });

    if (usuarioExistente) {
      return res.status(409).json({
        message: 'Este correo ya esta registrado en LuxeStay Hotels.'
      });
    }

    const hash = await bcrypt.hash(contrasena, 10);
    const usuario = await User.create({
      nombre: nombreLimpio,
      correo: correoLimpio,
      contrasena: hash
    });

    return res.status(201).json({
      message: 'Usuario registrado correctamente.',
      data: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        fechaRegistro: usuario.createdAt
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Este correo ya esta registrado en LuxeStay Hotels.'
      });
    }

    return next(error);
  }
}

module.exports = {
  registrarUsuario
};
