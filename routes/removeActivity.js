const express = require('express');
const router = express.Router();

router.delete('/', (req, res) => {
  req.pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.stack);
      res.status(500).send('Internal server error');
      return;
    }

    const activityId = req.params.id;

    const sql = 'DELETE FROM your_activities WHERE event_id = ?';
    const values = [activityId];

    connection.query(sql, values, (err, results) => {
      connection.release();

      if (err) {
        console.error('Error removing activity:', err.stack);
        res.status(500).send('Internal server error');
      } else {
        res.json({ message: 'Successfully removed the activity' });
      }
    });
  });
});

module.exports = router;