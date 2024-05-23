const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const Job = require('../models/jobModel');
const geocodeAddress = require('../config/generateCoordinate');

const addJob = async (req, res) => {
    let { jobName, description, avgSal, timing, workingDays, loc } = req.body;
    try {
        const geocodedAddressResponse = await geocodeAddress(loc);
        if (!geocodedAddressResponse || !geocodedAddressResponse.Results || !geocodedAddressResponse.Results.length) {
            throw new Error('Geocoding failed or returned empty results.');
        }
        const geocodedAddress = geocodedAddressResponse.Results[0];
        const { longitude, latitude } = geocodedAddress;
        let job = new Job({
            jobName,
            description,
            avgSal,
            timing,
            workingDays,
            loc, // Storing the address string
            provider: req.user._id,
            location: {
                type: "Point",
                coordinates: [longitude, latitude] // Storing the geocoded coordinates
            }
        });

        job = await job.save();

        // Assuming you're not using req.user._id
        const user = await User.findById(req.user._id);
        if (!user.postedJobs) {
            user.postedJobs = [];
        }

        user.postedJobs.push(job._id);
        await user.save();

        // Assuming you're emitting socket event using io from your socket module
        // io.getIo().emit('addProduct', { action: 'add', product: job });

        res.status(200).json({ job: job });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
}
const jobs=async(req,res)=>{
    let jobList=[];
    try{
      jobList=await Job.find().sort({createdAt:-1});
      res.status(200).json(jobList);
    }
    catch(err)
    {
      console.log('retrivejob err');
      res.status(500).json({errors:[{msg:'Retrival err'}]})
    }
}
const sortByDistance = asyncHandler(async (req, res) => {
    const userid = req.user._id;;
    const user=await User.findById(userid);
    const [longitude,latitude]=user.location.coordinates;
    if (!longitude || !latitude) {
      return res.status(400).json({ errors: [{ msg: 'Invalid or missing location coordinates' }] });
    }
  
    try {
      const jobs = await Job.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            distanceField: 'distance',
            spherical: true
          }
        }
      ]);
  
      res.status(200).json(jobs);
    } catch (error) {
      console.log('sortByDistance error:', error);
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  });
module.exports = { addJob,sortByDistance,jobs};

