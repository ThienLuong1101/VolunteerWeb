var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  return res.status(403).send('Access Forbidden');
});

module.exports = router;
