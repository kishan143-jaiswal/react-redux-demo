var express = require ('express');
var apiRoutes = express.Router();
const registeration=require('../api/registration');
const multer = require('multer');
const path = require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        
        cb(null,file.originalname)
    }
});

const fileFilter=(req,file,cb)=>
{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
})

module.exports=function(app){
   
app.use('/api', apiRoutes);
// login Auth
app.post('/register',registeration.Register);
app.post('/upload',upload.single('productImage'),(req,res)=>{
   res.json({
       path:req.file.path
   })
});
app.get('/registered_user',registeration.allRuser);
app.delete('/delete',registeration.deleteRuser);
app.put('/edituser/:id',registeration.editRuser);
app.get('/login/:email/:password',registeration.Login);
}