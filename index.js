var express = require('express');
var cors = require('cors');
require('dotenv').config()
var bp = require('body-parser');
const multer  = require('multer')
// const upload = multer({ dest: '/public/uploads/' })


var app = express();
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
// app.use('/uploads', express.static(process.cwd() + '/uploads'));

let storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, './public/uploads/') },
  filename: function (req, file, cb) { cb(null, file.originalname) }
})

let upload = multer({ storage: storage })

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single("upfile"), function (req, res) {
  // console.log(req.body);
  // console.log('file',req.files);
  // console.log('body',req.body.name);
  const fileMeta = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
 console.log(fileMeta);
 res.status(200).send(fileMeta);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
