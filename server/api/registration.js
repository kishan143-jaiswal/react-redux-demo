const Register = require('../model/registeration')
const mongoose=require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const multer = require('multer');
const upload = multer({dest:'uploads/'})


exports.Register =  function(req, res) {
Register.findOne({'email':req.body.email}).exec((err,userdata) => {
            if(userdata == null){
                const user = new Register({
                    _id:new mongoose.Types.ObjectId,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    password:req.body.password,
                    productImage:req.body.productImage
                });
                user.save()
                .then(data=>res.status(200).json({
                    user:user
                }))
                .catch(err=>console.log(err))
            }else{
                res.status(200).json({
                message:"users registered",
    });
            }
        })
        
 }

 exports.Login = function(req, res) {
    Register.findOne({'email':req.params.email,'password':req.params.password}).exec((err,userdata) => {
               if(userdata.email===req.params.email && userdata.password===req.params.password){
                        res.status(200).json({
                            message:'users exist',
                            data:userdata
                        })
               }else{
                   res.status(500).json({
                       message:'users not exist'
                   })

               }  
            })  
     }

 exports.allRuser=function(req,res,next){
     Register.find({},function(err,data){
         if(err) return next(err);
         res.send(data);
       
     })
 }

 exports.deleteRuser=function(req,res,next){
    Register.findOne({'email':req.body.email},function(err,data){
            if(data){
                data.remove()
                res.status(200).send({
                    message:"deleted",
                });
            }
    })
}

exports.editRuser=function(req,res,next){
    Register.update({_id: req.params.id},req.body)
    .then(function(success){
        res.json(req.body)
    })
    .catch(function(error){
        res.status(404).send(err)
    });

}
