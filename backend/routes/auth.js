const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Professor = require('../models/Professor');

// POST /api/login
router.post('/login', async (req, res) => {
    // Trim the username to handle accidental spaces from user input
    const { role, password } = req.body;
    const username = req.body.username ? req.body.username.trim() : "";

    if (!role || !username || !password) {
        return res.status(400).json({ message: 'Role, username, and password are required.' });
    }

    try {
        // --- Administrator Login Logic ---
        if (role === 'admin') {
            if (username === 'admin' && password === 'admin') {
                const userPayload = {
                    id: 'admin_user',
                    username: 'admin', // The name to display in the UI
                    role: 'admin'
                };
                
                const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ token }); // Use 'return' to exit successfully
            } else {
                // If it's an admin login but creds are wrong, fail immediately.
                return res.status(401).json({ message: 'Invalid admin credentials.' });
            }
        }

        // --- Professor Login Logic ---
        // This code block is now only reachable if the role is 'professor'
        if (role === 'professor') {
            // 1. Validate that the username is a number BEFORE querying the DB
            const professorId = parseInt(username, 10);
            if (isNaN(professorId)) {
                return res.status(400).json({ message: 'Invalid Professor ID format. Must be a number.' });
            }

            // 2. Query the database using the parsed number
            const professor = await Professor.findOne({ professor_id: professorId });

            // 3. Check for professor existence and password match
            // In a real app, use bcrypt.compare(password, professor.password)
            if (!professor || password !== professor.password) {
                return res.status(401).json({ message: 'Invalid Professor ID or password.' });
            }

            const userPayload = {
                id: professor._id,
                professor_id: professor.professor_id,
                username: professor.professor_name, // Send professor's name for UI display
                role: 'professor'
            };
            
            const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token }); // Exit successfully
        }

        // If the role is not 'admin' or 'professor', it's invalid.
        return res.status(400).json({ message: 'Invalid role specified.' });

    } catch (error) {
        // Log the detailed error on the server
        console.error('Login error:', error);
        // Send a generic error to the client
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router;