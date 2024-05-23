const express=require('express');
const router=express.Router();
const jobController=require('../controllers/jobController');
const isAuth=require('../config/isAuth');

router.post('/',isAuth,jobController.addJob);
router.get('/alljobs',jobController.jobs);
router.get('/sortByDistance',isAuth,jobController.sortByDistance)
module.exports=router;