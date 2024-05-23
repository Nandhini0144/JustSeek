const express=require("express");
const router=express.Router();
const {registerUser}=require('../controllers/userControllers')
const {authUser}=require('../controllers/userControllers')
const {emailVerificationHandler}=require('../controllers/userControllers');
router.route('/').post(registerUser)
router.post('/login',authUser);
router.get('/verify/:token/:name/:email',emailVerificationHandler);
module.exports=router;