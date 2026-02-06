const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Fusion Dynamics Backend is running' });
});

app.get('/api/fusion-data', (req, res) => {
  res.json({
    reactors: [
      { id: 1, name: 'Helicoidal HD-1', status: 'Active' },
      { id: 2, name: 'Tokamak HD-2', status: 'Testing' }
    ],
    satellites: 24,
    energyOutput: '10 GW'
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
