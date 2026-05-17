# metricas-calidad-utb

## Actividad semana 4 - Grupo 7

Proyecto de registro LuxeStay Hotels -  SONARCUBE.

## Estructura

- `frontend/registro.html`: formulario y consumo de API.
- `backend/`: API con Node.js, Express y MongoDB mediante Mongoose.


## Ejecutar el backend

1. Tener instalado Node.js , MongoDB y Docker escritorio.

2. Entrar a la carpeta del backend:

   ```bash
   cd backend
   ```

3. Instalar dependencias:

   ```bash
   npm install
   ```
4. Iniciar el servidor:

   ```bash
   npm run dev
   ```

5. Abrir en el navegador:

   ```text
   http://localhost:3000
   ```
#Pruebas SonarCube

6. En la ruta de backend:
   ```bash
   docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
   ```
7. Ingresar a SonarCube   
      http://localhost:9000
      Usuario y clave:  admin / admin
      
8. Instarla scanner de sonarcube
 ```bash
    npm install -g sonarqube-scanner          
 ```
9. Generar TOKEN en SonarCube
   y cambiar en sonar.login= ****
   
10. Ejecutar scanner
  ```bash
   sonar-scanner
   ```


## Jest Coverage + SonarQube

### Ejecutar pruebas
```bash
npm test
```

### Ejecutar coverage
```bash
npm run test:coverage
```

### Archivo generado
```text
coverage/lcov.info
```

SonarQube utiliza este archivo para mostrar métricas de cobertura.
