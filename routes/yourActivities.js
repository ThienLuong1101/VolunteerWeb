var express = require('express');
var router = express.Router();


// Connect to MySQL
router.post('/', function (req, res, next) {
    var eventName = req.body.eventName;
    var eventTime = req.body.eventTime.split('T')[0];
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
        var sql = 'SELECT * FROM make_event WHERE event_id = ?';
        sql = "INSERT INTO your_activities (event_name, event_time, event_street, event_city, event_state, event_zip, event_description) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, [eventName, eventTime, eventStreet, eventCity, eventState, eventZip, eventDescription], (err, result) => {
            // Release the connection back to the pool
            connection.release();
            if (err) {
                console.error('Error inserting data into MySQL:', err.stack);
                res.status(500).send('Internal server error');
            } else {
                console.log('Event inserted successfully');
                res.send('Event inserted successfully');
            }
        });
    });
});


module.exports = router;
