'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
let multer = require('multer')
let upload = multer()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// POST /api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (req.file) {
    res.json({
      filename: req.file.originalname,
      size: `${req.file.size} bytes`
    })
  } else {
    res.json({error: 'Please select a file to upload'})
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});