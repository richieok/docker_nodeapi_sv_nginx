import express from 'express';
import multer from 'multer'
import { getParameters } from './aws.js';

if (process.env.CLOUD === 'aws') {
  getParameters(process.env['SSM_PARAMETER_PATH']).then(() => {
    console.log("Parameters loaded from AWS SSM");
    startservice();
  })
  
} else {
  console.log("No AWS SSM parameters to load, starting service...");
  startservice();
}

async function startservice() {
  console.log("Starting service...");
  let { authenticateToken, login, registerUser } = await import('./auth.js');
  let { getWorkers } = await import('./actions.js');
  
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

}
