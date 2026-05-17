const { validarRegistro } = require('../backend/src/controllers/userController');

describe('Pruebas validarRegistro', () => {

  test('Debe retornar error si nombre está vacío', () => {

    const resultado = validarRegistro({
      nombre: '',
      correo: 'test@test.com',
      contrasena: 'Password123'
    });

    expect(resultado.errores.length).toBeGreaterThan(0);
  });

  test('Debe retornar error para correo inválido', () => {

    const resultado = validarRegistro({
      nombre: 'Carlos',
      correo: 'correo-invalido',
      contrasena: 'Password123'
    });

    expect(resultado.errores).toContain('Ingresa un correo valido.');
  });

  test('Debe retornar error para contraseña débil', () => {

    const resultado = validarRegistro({
      nombre: 'Carlos',
      correo: 'test@test.com',
      contrasena: '123'
    });

    expect(resultado.errores.length).toBeGreaterThan(0);
  });

  test('Debe validar correctamente datos válidos', () => {

    const resultado = validarRegistro({
      nombre: 'Carlos',
      correo: 'test@test.com',
      contrasena: 'Password123'
    });

    expect(resultado.errores.length).toBe(0);
  });

});
