const express=require('express');
const app=express();
const bodyParser=require('body-parser');
var config = require ('./config');
const mongoose =require('mongoose');

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use('/uploads',express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/redux_demo', function (err) {
  if (err) {
    console.log('Sorry can not connect with mongodb...');
  } else {
    console.log('Successfully redux_demo connected mongodb...');
  }
});
module.exports = mongoose;

require('./routes')(app);

var enableCORS = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.all("/*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  next();
});
app.use(enableCORS);

app.use((req,res,next)=>{
    const error=new Error('NOT FOUND DATA')
    error.status=404;
    next(error);
})



app.use((error,req,res,next)=>{
    res.status(error.status||500).json({
        error:{
            message:error.message
        }
    });
})

    
    
module.exports=app;