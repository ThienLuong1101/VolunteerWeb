var express = require('express');
var router = express.Router();

// Connect to MySQL
router.post('/', function (req, res, next) {
    var eventName = req.body.eventName;
    var eventTime = req.body.eventTime;
    var date = new Date(eventTime);
    var formattedEventTime = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    var eventStreet = req.body.eventStreet;
    var eventCity = req.body.eventCity;
    var eventState = req.body.eventState;
    var eventZip = req.body.eventZip;
    var eventDescription = req.body.eventDescription;

    // Get the connection from the pool
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error getting MySQL connection:', err.stack);
            res.status(500).send('Internal server error');
            return;
        }
        // Insert event data into the SQL table
        var sql = "INSERT INTO make_event (event_name, event_time, event_street, event_city, event_state, event_zip, event_description) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, [eventName, formattedEventTime, eventStreet, eventCity, eventState, eventZip, eventDescription], (err, result) => {
            // Release the connection back to the pool
            connection.release();
            if (err) {
                console.error('Error inserting data into MySQL:', err.stack);
                res.status(500).send('Internal server error');
            } else {
                console.log('Event inserted successfully');

                res.status(200);
            }
        });
    });
});

module.exports = router;
