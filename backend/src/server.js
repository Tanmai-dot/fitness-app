const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const profiles = new Map();

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.get('/profile', authenticateToken, (req, res) => {
  const profile = profiles.get(req.user.id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

app.put('/profile', authenticateToken, (req, res) => {
  const { fullName, phone, profile } = req.body;
  
  if (!profile) {
    return res.status(400).json({ error: 'Profile data required' });
  }

  const userData = { fullName, phone, profile };
  profiles.set(req.user.id, userData);
  
  res.json({ message: 'Profile updated successfully', data: userData });
});

// Test token endpoint
app.post('/auth/token', (req, res) => {
  const token = jwt.sign({ id: 'user123' }, JWT_SECRET);
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});