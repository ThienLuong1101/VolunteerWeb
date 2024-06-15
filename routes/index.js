var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var images = [
  { uri: 'v2_10.png', description: 'medium-coated black-and-white dog near grass during daytime' },
  { uri: 'v2_11.png', description: 'black and tan Belgian dog' },
  { uri: 'v2_4.png', description: 'gray dog standing on grass' },

];

function uniqueId(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let imageIndex = 0;

router.get('/images.json', (req, res) => {
  const image = images[imageIndex];
  imageIndex = (imageIndex + 1) % images.length;
  res.json(image);
});

module.exports = router;


