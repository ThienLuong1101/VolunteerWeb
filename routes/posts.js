const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise'); // Use promise-based API for async/await support
const uuid = require('uuid');
var nodemailer = require('nodemailer');


// Connect to MySQL

router.post('/', function (req, res, next) {
    var message = req.body["subject"];
    if (!message || message === '') {
        res.status(400).send('Message is missing or empty'); // Send an error response with message
    } else {
        // Get the connection from the pool
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.error('Error getting MySQL connection:', err.stack);
                res.status(500).send('Internal server error');
                return;
            }
            // Insert message into SQL table
            var sql = "INSERT INTO posts (subject) VALUES (?)";
            connection.query(sql, [message], (err, result) => {
                // Release the connection back to the pool
                connection.release();
                if (err) {
                    console.error('Error inserting data into MySQL:', err.stack);
                    res.status(500).send('Internal server error');
                } else {
                    console.log('Message inserted successfully');

                    res.status(200).send('Message inserted successfully');
                }
            });
        });
    }
});




router.post('/gmail', function (req, res, next) {
    var message = req.body["subject"];

    if (!message || message === '') {
        res.status(400).send('Message is missing or empty');
        return;
    }

    // Get the connection from the pool
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error getting MySQL connection:', err.stack);
            res.status(500).send('Internal server error');
            return;
        }

        // Insert message into SQL table
        var sql = "INSERT INTO posts (subject) VALUES (?)";
        connection.query(sql, [message], (err, result) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error inserting data into MySQL:', err.stack);
                res.status(500).send('Internal server error');
                return;
            }

            console.log('Message inserted successfully');
            // Fetch emails from SQL table where role is '01'
            var sql2 = `SELECT email FROM accounts WHERE role = '01'`;
            connection.query(sql2, (err, results) => {
                if (err) {
                    console.error('Error fetching data from MySQL:', err.stack);
                    res.status(500).send('Internal server error');
                    return;
                }

                console.log('Data fetched successfully');
                // Extract emails from results into an array
                let emails = results.map(result => result.email);

                // Create nodemailer transporter
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'luongan1101@gmail.com',
                        pass: 'pobi ozmm azcl guzp'
                    }
                });

                var mailOptions = {
                    from: 'luongan1101@gmail.com',
                    to: emails.join(','),
                    subject: 'TELT Foundation - IMPORTANT ANNOUNCEMETN:',
                    text: message
                };

                // Send email
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error('Error sending email:', error);
                        res.status(500).send('Failed to send email');
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).send('Email sent successfully');
                    }
                });
            });
        });
    });
});



module.exports = router;
