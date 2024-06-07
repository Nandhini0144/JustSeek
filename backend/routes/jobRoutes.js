const express=require('express');
const router=express.Router();
const jobController=require('../controllers/jobController');
const isAuth=require('../config/isAuth');

router.post('/',isAuth,jobController.addJob);
router.get('/alljobs',jobController.jobs);
router.get('/sortByDistance/:location',jobController.sortByDistance)
router.get('/sortByGeoLocation/:latitude/:longitude',jobController.sortByGeoLocation)
router.get('/applyForJob/:jobId',isAuth,jobController.applyForJob)
router.get('/displayApplicants/:jobId',isAuth,jobController.getApplicants)
router.delete('/deleteJob/:jobId',jobController.deleteJob);
module.exports=router;