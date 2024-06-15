var express = require('express');
var router = express.Router();

// Connect to MySQL

router.post('/save-url', function (req, res, next) {
    const { url } = req.body;
    if (!url || url === '') {
        res.status(400).send('URL is missing or empty'); // Send an error response with message
    } else {
        // Get the connection from the pool
        req.pool.getConnection(function (err, connection) {
            if (err) {
                console.error('Error getting MySQL connection:', err.stack);
                res.status(500).send('Internal server error');
                return;
            }
            // Begin a transaction
            connection.beginTransaction(function (err) {
                if (err) {
                    console.error('Error beginning transaction:', err.stack);
                    res.status(500).send('Internal server error');
                    return;
                }
                // Delete all existing URLs
                connection.query("DELETE FROM organizations", (err, result) => {
                    if (err) {
                        connection.rollback(function () {
                            console.error('Error deleting existing URLs:', err.stack);
                            res.status(500).send('Internal server error');
                        });
                        return;
                    }
                    // Insert the new URL
                    var insertSql = "INSERT INTO organizations (organization_url) VALUES (?)";
                    connection.query(insertSql, [url], (err, result) => {
                        if (err) {
                            connection.rollback(function () {
                                console.error('Error inserting new URL:', err.stack);
                                res.status(500).send('Internal server error');
                            });
                            return;
                        }
                        // Commit the transaction
                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    console.error('Error committing transaction:', err.stack);
                                    res.status(500).send('Internal server error');
                                });
                                return;
                            }
                            // Release the connection back to the pool
                            connection.release();
                            console.log('Transaction completed successfully');
                            res.send('URL saved successfully');
                        });
                    });
                });
            });
        });
    }
});

router.get('/display-urls', function (req, res, next) {
    // Get the connection from the pool
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error getting MySQL connection:', err.stack);
            res.status(500).send('Internal server error');
            return;
        }
        // Fetch data from MySQL table
        var sql = "SELECT organization_url FROM organizations LIMIT 1";
        connection.query(sql, (err, result) => {
            // Release the connection back to the pool
            connection.release();
            if (err) {
                console.error('Error fetching data from MySQL:', err.stack);
                res.status(500).send('Internal server error');
            } else {
                console.log('Data fetched successfully');
                if (result.length > 0) {
                    // Extract the URL from the result and send it as a string response
                    res.status(200).send(result[0].organization_url);
                } else {
                    res.status(404).send('No URL found');
                }
            }
        });
    });
});



module.exports = router;
