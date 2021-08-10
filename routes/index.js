var express = require('express');
var router = express.Router();
var axios = require("axios");
let imagesArray = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Golden Charter Technical Test', author:'Alexander Mackenzie' });
});

/* GET start page. */
router.get('/start', function(req, res, next) {
  imagesArray = [];
  axios.get("https://picsum.photos/v2/list?limit=50")
  .then( (response)=>{
    response.data.map((images)=>{
      imagesArray.push(images);
    });
    res.render('start', {
      title: 'Images from Picsum',
      images: imagesArray
    });
  })
  .catch((err)=>{
    console.log(err);
  });
});

/* GET dynamic image page. */
router.get('/start/image:id', function(req, res, next) {
  res.render('image', {
    title: 'You clicked on image ' + req.params.id,
    image: imagesArray[req.params.id-1]
  });
});


module.exports = router;
