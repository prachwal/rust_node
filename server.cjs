// server.js
const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// Ładowanie natywnego modułu
const { calculatePi  } = require('./pi_calculator/native/index.node');

app.get('/api/pi', (req, res) => {
    try {
        if (!calculatePi ) {
            throw new Error('Native module not loaded yet');
        }
        const iterations = parseInt(req.query.iterations) || 1000000;
        if (iterations <= 0) {
            return res.status(400).json({ error: 'Iterations must be positive' });
        }
        const pi = calculatePi (iterations); // Zakładam, że hello przyjmuje iteracje jako argument
        res.json({
            pi: pi,
            iterations: iterations,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});