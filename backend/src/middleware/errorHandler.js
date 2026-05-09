//Luego de validación con Eslint se elimina next del llamado a la función
function errorHandler(error, req, res) {
  console.error(error);

  res.status(500).json({
    message: 'Error interno del servidor.'
  });
}

module.exports = errorHandler;
