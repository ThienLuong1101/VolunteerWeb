const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise'); // Use promise-based API for async/await support
const uuid = require('uuid');
var nodemailer = require('nodemailer');


// Hash a password asynchronously
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`Original password: ${password}`);
    console.log(`Hashed password: ${hashedPassword}`);
    return hashedPassword;
}

// Generate a random OTP
let otp_code = Math.floor(1000 + Math.random() * 9000);


router.post('/sentotp', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if email already exists in the database
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error getting MySQL connection:', err.stack);
            res.status(500).send('Internal server error');
            return;
        }

        var sqlCheckEmail = "SELECT COUNT(*) AS count FROM accounts WHERE email = ?";
        connection.query(sqlCheckEmail, [email], (err, result) => {
            if (err) {
                connection.release();
                console.error('Error querying data from MySQL:', err.stack);
                res.status(500).send('Internal server error');
                return;
            }

            const emailExists = result[0].count > 0;
            if (emailExists) {
                connection.release();
                console.log('Email exists in the database');
                res.status(400).send('Email exists in the database');
            } else {
                // Send OTP email
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'luongan1101@gmail.com',
                        pass: 'pobi ozmm azcl guzp'
                    }
                });

                var mailOptions = {
                    from: 'luongan1101@gmail.com',
                    to: email,
                    subject: 'TELT Foundation - Your OPT Verification',
                    text: otp_code.toString()
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500).send(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).send();
                    }
                });
            }
        });
    });




});



router.post('/signup', async (req, res) => {
    const { email, password, otp } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error getting MySQL connection:', err.stack);
            res.status(500).send('Internal server error');
            return;
        }



        if (otp.toString() != otp_code.toString()) {

            res.status(400).send('invalid otp!');
        } else {

            const userId = uuid.v4();
            console.log(userId);
            var sqlInsertUser = "INSERT INTO accounts (user_id, email, password_hash, role) VALUES (?, ?, ?, ?)";
            bcrypt.hash(password, 10, function (err, hashedPassword) {
                if (err) {
                    connection.release();
                    console.error('Error hashing password:', err);
                    res.status(500).send('Internal server error');
                    return;
                }
                connection.query(sqlInsertUser, [userId, email, hashedPassword, '01'], (err, result) => {
                    connection.release();
                    if (err) {
                        console.error('Error inserting data into MySQL:', err.stack);
                        res.status(500).send('Internal server error');
                    } else {
                        console.log('User registered successfully');
                        res.status(201).send();
                    }
                });
            });
        }

    });

});

router.post('/add_user', function (req, res) {
    var { FullName, LinkedURL, Email, Phone, DateOfBirth, Address } = req.body;

    if (!FullName || !LinkedURL || !Email || !Phone || !DateOfBirth || !Address) {
        return res.status(400).send('All fields are required.');
    }

    req.pool.getConnection(function (err, connection) {
        if (err) {
            res.status(500).send();
        }
        var query = "INSERT INTO Users (FullName,LinkedURL,Email,Phone,DateOfBirth,Address) VALUES (?,?,?,?,?,?);";
        connection.query(query, [FullName, LinkedURL, Email, Phone, DateOfBirth, Address], function (err, result) {
            connection.release();
            if (err) {
                console.error("Error adding new user");
                res.send(500).send("Internal server error");
            } else {
                console.log("Add user success");
                res.status(201).send();
            }
        })
    })
})

module.exports = router;
