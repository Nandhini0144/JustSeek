const bcrypt=require('bcryptjs');
const nodemailer = require('nodemailer');
const User=require('../models/userModel');
const asyncHandler=require("express-async-handler");
const generateToken=require('../config/generateToken');
const geocodeAddress = require('../config/generateCoordinate');

require('dotenv/config.js')
const jwt=require('jsonwebtoken');
let tok='';
let isVerified='false';
let hashedPassword='';
const emailVerificationHandler = async (req, res) => {
    try {
        const token = req.params.token;
        const name=req.params.name;
        const email=req.params.email;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("decoded", decoded);
        isVerified='true';
        res.status(200).json({msg:"verified successfully"});
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
}

const emailVerification = async (req, email, name) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nandhini.k2021csbs@sece.ac.in', // Update with your Gmail email
            pass: 'nand@0144' // Update with your Gmail password
        }
    });

    const payload = {
        user: {
            name: name,
            email: email
        }
    };

    const tok = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '10m' });

    const mailConfigurations = {
        from: 'nandhini.k2021csbs@sece.ac.in', // Update with your Gmail email
        to: email,
        subject: 'Email Verification',
        text: `Hi ${name}! You have recently visited our website and entered your email. Please follow the given link to verify your email: http://localhost:5000/api/user/verify/${tok}/${name}/${email} Thanks`
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.error("Email couldn't be sent");
            console.error(error);
        } else {
            console.log('Email Sent Successfully');
            console.log(info);
            console.log(tok);
        }
    });
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,loc } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists && userExists.verified) {
        res.status(400);
        throw new Error("User already exists");
    }
    try {
        const salt = await bcrypt.genSalt(10); 
        hashedPassword = await bcrypt.hash(password, salt);
        await emailVerification(req, email, name);
        setTimeout(async() => {
            intervalId = setInterval(async() => {
                if(isVerified=='true')
                {
        const geocodedAddressResponse = await geocodeAddress(loc);
        if (!geocodedAddressResponse || !geocodedAddressResponse.Results || !geocodedAddressResponse.Results.length) {
            throw new Error('Geocoding failed or returned empty results.');
        }
        const geocodedAddress = geocodedAddressResponse.Results[0];
        const { longitude, latitude } = geocodedAddress;
                const newUser = new User({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    verified: true,
                    loc:loc,
                    location: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    }
                });
                console.log("user data saved");
                const user = await newUser.save();
                if (user) {
                    res.status(201).json({
                        token: generateToken(user),
                    });
                } else {
                    res.status(400);
                    throw new Error("Failed to create user");
                }
                clearInterval(intervalId); 
            }
            }, 60000);
            
        }, 1000);
    } catch (error) {
        console.error("Error sending email verification:", error);
        res.status(500).send("Error sending email verification");
        return;
    }
  
   
});
const authUser=asyncHandler(async(req,res)=>{
    try{
    const{email,password}=req.body;
    const user=await User.findOne({email});
    console.log(user)
    if(user)
    {
        console.log("hello user founded");
        // const salt=(await bcrypt.genSalt(10)).toString();
        // const p=await bcrypt.hash(password,salt);
        // console.log(p);
        // console.log(user.password);
        if(await bcrypt.compare(password,user.password))
      {
        console.log("user succesfully logged in")
        res.status(200).json({
            token:generateToken(user),
            userId:user._id,
            location:user.location
        })
    }
        else{
            res.status(401);
            throw new Error("Invalid Email or password");
        };
    }
    else{
        res.status(401);
        throw new Error("insufficient data");
    }}
    catch(err)
    {
        res.status(404).send({msg:err});
    }
})
const modifyProfile=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt.toString());
        user.password = hashedPassword;
    }
      const updatedUser = await user.save();
      res.send({  
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
})
const profile=async(req,res)=>{
    const user=await User.findById(req.user.id);
    if(user)
    {
         res.json(user);
    }
    else{
     res.status(404).send({ message: 'User not found' });
    }
}
const postedJobs=asyncHandler(async(req,res)=>{
    const {user}=req;
     try{
        const fetchedUser=await User.findById(user.id);
        await fetchedUser.populate({
            path: 'postedJobs',
            populate: {
              path: 'applicants',
              model: 'User'
            }
          });
        res.json(fetchedUser.postedJobs);
     }
     catch(error){
        res.status(500).json({errors:[{msg:'Server error'}]});
     }
})
const appliedJobs=async(req,res)=>{
    try{
      const user=req.user._id;
      const userData=await User.findById(user);
      await userData.populate('appliedJobs')
      res.status(200).json({appliedJobs:userData.appliedJobs})
    }
    catch(err){
      res.status(500).json({err:err}) 
    }
  }
module.exports={registerUser,authUser,modifyProfile,postedJobs,emailVerification,emailVerificationHandler,profile,appliedJobs}
