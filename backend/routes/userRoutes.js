const express=require("express");
const router=express.Router();
const {registerUser}=require('../controllers/userControllers')
const {authUser}=require('../controllers/userControllers')
const {emailVerificationHandler}=require('../controllers/userControllers');
const isAuth=require('../config/isAuth');
const userController=require('../controllers/userControllers');

router.route('/').post(registerUser)
router.post('/login',authUser);
router.get('/verify/:token/:name/:email',emailVerificationHandler);
router.get('/retriveByUserId',isAuth,userController.postedJobs)
router.get('/appliedJobs',isAuth,userController.appliedJobs)
router.get('/profileDetails',isAuth,userController.profile);
router.put('/modifyProfile',isAuth,userController.modifyProfile);
module.exports=router;