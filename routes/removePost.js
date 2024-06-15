var express = require('express');
var router = express.Router();

// POST endpoint to remove a post from MySQL
router.post('/removePost', function (req, res, next) {
    const postId = req.body.postId;

    // Retrieve MySQL connection pool from app settings

    // Acquire a connection from the pool
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.error('Error getting MySQL connection:', err.stack);
            res.status(500).send('Internal server error');
            return;
        }

        // Execute the delete query
        var sql = "DELETE FROM posts WHERE id = ?";
        connection.query(sql, [postId], function (err, result) {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error executing MySQL query:', err.stack);
                res.status(500).send('Internal server error');
            } else {
                console.log('Post removed successfully');
                res.status(200).json({ message: 'Post removed successfully' });
            }
        });
    });
});

module.exports = router;
