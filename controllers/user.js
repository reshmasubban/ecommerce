const User= require('../models/user');
const jwt = require("jsonwebtoken")
require("dotenv").config()
const nodemailer = require("nodemailer");


exports.userById= (req,res,next,id) => {
        User.findById(id).exec((err,user) => {
            if(err || !user){
                return res.status(400).json({
                    error : "User not found"
                });
            }
            req.profile = user;
            next();
        });
    }

exports.register= async (req,res) => {
    const {name,email,password,role}=req.body;
    User.findOne({email}).exec((err,user) => {
        if(user){
            return res.status(400).json({error:"user with this email already exits"});
        }
        const token =jwt.sign({name,email,password,role},process.env.JWT_ACC_ACTIVATE );
            const transporter = nodemailer.createTransport({
                    service: 'gmail',
                      auth: {
                        user:  process.env.SMTP_USERNAME,
                        pass:  process.env.SMTP_PASSWORD
                      }
                    });
                var mailOptions = {
                        from:'reshmasubban25@gmail.com',
                        to:email,
                        subject:'Sending Email using Node.js',
                        html: `<h2>please activate your account<h2>
                        <p>${token}</p>
                        `  
                     }
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error)
                    } else{
                        console.log('Email sent:' + info.response)
                    }
                    res.send('sending successfully')
                })          
            res.json({
                message:"signup succesfull"
            })
        })
}

exports.activate = (req,res) => {
    const{token} = req.body;
    if (token){
        jwt.verify(token,process.env.JWT_ACC_ACTIVATE,function(err,decodedToken) {
            if(err) {
                return res.status(400).json({
                    error : 'Activation link is wrong'
                }); 
            }
            const {name,email,password,role}=decodedToken;
            User.findOne({email}).exec((err,user) => {
            if(user){
                return res.status(400).json({error:"user with this email does not exit"});
            }
            
            const newUser = new User({name,email,password,role});
            newUser.save((err,success)=>{
                if(err) {
                    return res.status(400),json({error:"error when activation"});
                }
                res.json({
                    message:"signup successfull"
                })
            })
            })
        })
    } else {
        return res.json({error:"something went wrong"})
    }
}

exports.login = ((req, res) => {
    const { email,password } = req.body
    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(400).json({
                error : 'User with this email does not exist'
            });
        }

        // creating token with JWT
        const token = jwt.sign({_id : user._id}, "reshma");


        const {_id,name,email,role} = user

        return res.json({token,user : { _id, name, email,role}});
    });
});


exports.isSuperAdmin = (req,res,next) => {
    if(req.profile.role != 1){
        return res.status(403).json({
            error:"Super Admin Resource! Access Denied"
        })
    }
    next();
}

exports.profile = (req,res) => {
    return res.json(req.profile)
}


exports.update = (req,res) =>{
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true},
        (err,user) => {
            if(err) {
                return res.status(400).json({
                    error:"You are not authorized to perform this action"
                })
            }
            res.json(user);
        }
    );
}
exports.superAdmin = (req,res) =>{
    User.find({role:{$ne:1}})
    .select(["name","email"])
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No user found"
                })
            }
            res.json(data)
        })
}
exports.isAdmin = (req,res,next) => {
    if(req.profile.role != 2){
        return res.status(403).json({
            error:"Admin Resource! Access Denied"
        })
    }
    next();
}
exports.admin=((req,res) =>{
    User.find({role:{$nin:[1,2]}})
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No user found"
                })
            }
            res.json(data)
        })
})
