import express from 'express';
import multer from 'multer'
import './aws.js';

import { authenticateToken, login, registerUser } from './auth.js';
import { getWorkers } from './actions.js';

const app = express();
const upload = multer()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ "message": "/api endpoint", "status": "true" })
});

app.get('/api/test', (req, res) => {
  res.json({ "message": "Test endpoint", "status": "true", "test": process.env.TEST || 'NOT_FOUND' });
});

app.get('/api/workers', authenticateToken, getWorkers);

app.post('/api/login', upload.none(), login);

app.post('/api/signup', upload.none(), registerUser);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});