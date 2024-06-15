var express = require('express');
var router = express.Router();

// Connect to MySQL

router.get('/posts', function (req, res, next) {
  // Get the connection from the pool
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }
    // Fetch data from MySQL table
    var sql = "SELECT id, subject, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS created_at_time FROM posts";
    connection.query(sql, (err, result) => {
      // Release the connection back to the pool
      connection.release();
      if (err) {
        console.error('Error fetching data from MySQL:', err.stack);
        res.status(500).send('Internal server error');
      } else {
        console.log('Data fetched successfully');
        res.json(result); // Send fetched data as JSON response
      }
    });
  });

});

router.get('/users', function (req, res, next) {
  // Get the connection from the pool
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }
    // Fetch data from MySQL table
    var sql = "SELECT * FROM Users";
    connection.query(sql, (err, result) => {
      // Release the connection back to the pool
      connection.release();
      if (err) {
        console.error('Error fetching data from MySQL:', err.stack);
        res.status(500).send('Internal server error');
      } else {
        console.log('Data fetched successfully');
        res.json(result); // Send fetched data as JSON response
      }
    });
  });
});


router.get('/upcoming-events', (req, res) => {
  // Get the connection from the pool
  req.pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }

    // Query the database to get upcoming events
    const sql = `
      SELECT make_event.*
FROM make_event
LEFT JOIN your_activities ON make_event.event_id = your_activities.event_id
WHERE your_activities.event_id IS NULL; `;
    connection.query(sql, (err, results) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error fetching upcoming events:', err.stack);
        res.status(500).send('Internal server error');
      } else {
        // Convert each event_time to 'YYYY-MM-DD HH:MM:SS' format
        const formattedResults = results.map(event => {
          const eventTime = new Date(event.event_time);
          const formattedEventTime = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:${eventTime.getSeconds().toString().padStart(2, '0')}`;

          return {
            ...event,
            event_time: formattedEventTime
          };
        });


        res.json(formattedResults); // Send the upcoming events as a JSON response
      }
    });
  });
});




router.get('/yourActivit', (req, res) => {
  // Get the connection from the pool
  req.pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }

    // Query the database to get upcoming events
    const sql = 'SELECT * FROM your_activities;';
    connection.query(sql, (err, results) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error fetching upcoming events:', err.stack);
        res.status(500).send('Internal server error');
      } else {
        // Check if the results array is empty
        if (results.length === 0) {
          res.json([]); // Return an empty array if there are no activities
        } else {
          // Convert each event_time to 'YYYY-MM-DD HH:MM:SS' format
          const formattedResults = results.map(event => {
            const eventTime = event.event_time ? new Date(event.event_time) : null;
            const formattedEventTime = eventTime
              ? `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:${eventTime.getSeconds().toString().padStart(2, '0')}`
              : null;

            return {
              ...event,
              event_time: formattedEventTime
            };
          });

          res.json(formattedResults); // Send the upcoming events as a JSON response
        }
      }
    });
  });
});




router.post('/register-event', (req, res) => {
  var event_id = req.body.event_id;
  var event_name = req.body.event_name;
  var event_time = req.body.event_time;

  req.pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }

    var sql = "INSERT INTO your_activities (event_id, event_name, event_time) VALUES (?, ?, ?)";
    connection.query(sql, [event_id, event_name, event_time], (err, results) => {
      connection.release();

      if (err) {
        console.error('Error fetching upcoming events:', err.stack);
        console.log(req.body);
        res.status(500).send('Internal server error');

      } else {
        res.json(results); // Send the upcoming events as a JSON response
      }
    });
  });
});




router.delete('/remove-activity/:id', (req, res) => {
  const activityId = req.params.id;

  req.pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }

    // Remove the event registration from the your_activities table
    const sql = 'DELETE FROM your_activities WHERE event_id = ?';
    connection.query(sql, [activityId], (err, result) => {
      connection.release();

      if (err) {
        console.error('Error removing activity:', err.stack);
        res.status(500).send('Internal server error');
      } else {
        res.sendStatus(200);
      }
    });
  });
});




router.get('/upcoming-events_manager', (req, res) => {
  // Get the connection from the pool
  req.pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }

    // Query the database to get upcoming events
    const sql = `
      SELECT make_event.*
FROM make_event
LEFT JOIN your_activities ON make_event.event_id = your_activities.event_id
WHERE your_activities.event_id IS NULL; `;
    connection.query(sql, (err, results) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error fetching upcoming events:', err.stack);
        res.status(500).send('Internal server error');
      } else {
        // Convert each event_time to 'YYYY-MM-DD HH:MM:SS' format
        const formattedResults = results.map(event => {
          const eventTime = new Date(event.event_time);
          const formattedEventTime = `${eventTime.getFullYear()}-${(eventTime.getMonth() + 1).toString().padStart(2, '0')}-${eventTime.getDate().toString().padStart(2, '0')} ${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:${eventTime.getSeconds().toString().padStart(2, '0')}`;

          return {
            ...event,
            event_time: formattedEventTime
          };
        });

        console.log("inside data format: " + formattedResults[0].event_time);
        res.json(formattedResults); // Send the upcoming events as a JSON response
      }
    });
  });
});

// const Event = require('../models/event');

router.delete('/delete-event/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  // Get a connection from the pool (req.pool is now defined)
  req.pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }

    // Delete the event from the make_event table
    const sql = 'DELETE FROM make_event WHERE event_id = ?';
    connection.query(sql, [eventId], (err, result) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error deleting event:', err.stack);
        res.status(500).send('Internal server error');
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Event not found' });
        } else {
          res.status(200).json({ message: 'Event deleted successfully' });
        }
      }
    });
  });
});


module.exports = router;
