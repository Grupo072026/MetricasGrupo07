const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const frontendPath = path.join(__dirname, '..', '..', 'frontend');

app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || true
}));
app.use(express.json());
app.use(express.static(frontendPath));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'luxestay-registro-api' });
});

app.use('/api/usuarios', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'registro.html'));
});

app.use(errorHandler);

module.exports = app;
