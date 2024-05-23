const mongoose=require("mongoose");
const express=require("express");
const dotenv=require("dotenv");
const jobRoutes=require('./routes/jobRoutes');
const userRoutes=require('./routes/userRoutes');
const {notFound,errorHandler}=require("./middleware/errormiddleware") 

const app=express();
mongoose.connect("mongodb+srv://nandhinikuppuraj:Nand%400144@cluster1.lwgfisv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1");
mongoose.connection.on('connected',()=>console.log('connected'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const cors = require('cors');

// CORS
app.use(cors());
app.use((req, res, next) => {

  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
     
  
  if (req.method === 'OPTIONS') {
    console.log(`Preflight request detected`);
    return next()

  } else {
    next();
  }
  });

app.use("/api/job",jobRoutes);
app.use("/api/user",userRoutes);
app.use(notFound);
app.use(errorHandler); 
app.listen(5000)
