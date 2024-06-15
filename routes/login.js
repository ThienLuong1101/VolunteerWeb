const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`Original password: ${password}`);
    console.log(`Hashed password: ${hashedPassword}`);
    return hashedPassword;
}

router.post('/login', function (req, res, next) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Get a database connection from the pool
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error getting MySQL connection:', err.stack);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        // Check if the email exists in the database
        const sqlCheckEmail = "SELECT * FROM accounts WHERE email = ?";
        connection.query(sqlCheckEmail, [email], async (err, results) => {
            if (err) {
                connection.release();
                console.error('Error querying data from MySQL:', err.stack);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            if (results.length === 0) {
                // Email not found in the database
                connection.release();
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            // Email exists, verify password
            const user = results[0];
            try {
                const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
                if (isPasswordMatch) {
                    // Passwords match, login successful
                    connection.release();
                    console.log("hello");
                    req.session.user = {
                        user_id: user.user_id,
                        role: user.role
                    };


                    return res.status(200).send(user.role);

                } else {
                    // Passwords don't match, login failed
                    connection.release();
                    return res.status(401).json({ error: 'Invalid email or password.' });
                }
            } catch (error) {
                console.error('Error comparing passwords:', error);
                connection.release();
                return res.status(500).json({ error: 'Internal server error.' });
            }
        });
    });
});


// Logout a user by removing/disassociating their details from their browser session
router.post('/logout', function (req, res, next) {
    delete req.session.user;

    return res.status(200).send(); // Sending an empty response to acknowledge the logout
});


module.exports = router;
