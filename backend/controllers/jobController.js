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
const applyForJob=async(req,res)=>{
  try{
        const jobId=req.params.jobId;
        const user=req.user._id;
        const job=await Job.findById(jobId);
        const userData=await User.findById(user);
        if(!userData.appliedJobs)
          {
            userData.appliedJobs=[];
          }
        userData.appliedJobs.push(jobId)
        await userData.save();
        if(!job.applicants)
          {
            job.applicants=[];
          }
        job.applicants.push(user);
        await job.save();
        console.log(job.applicants)
        res.status(200).json(job.applicants)
        }
        catch(err)
        {
          res.status(500).json({err:err})
        }
}
const getApplicants=async(req,res)=>{
  try{
  const jobId=req.params.jobId;
  const job=await Job.findById(jobId);
  console.log(job.applicants)
  await job.populate('applicants');
  res.status(200).json({applicants:job.applicants})
  }
  catch(err)
  {
    res.status(500).json({err:err})
  }
}

const jobs=async(req,res)=>{
    let jobList=[];
    try{
      jobList=await Job.find().sort({createdAt:-1}).populate('provider');
      res.status(200).json(jobList);
    }
    catch(err)
    {
      console.log('retrivejob err');
      res.status(500).json({errors:[{msg:'Retrival err'}]})
    }
}

const sortByGeoLocation=asyncHandler(async(req,res)=>{
       try
       {
          const{latitude,longitude}=req.params;
          const lat = parseFloat(latitude);
          const lon = parseFloat(longitude);
          const jobs = await Job.aggregate([
            {
              $geoNear: {
                near: {
                  type: 'Point',
                  coordinates: [lon,lat]
                },
                distanceField: 'distance',
                spherical: true
              }
            },  {
              $lookup: {
                from: 'users', // The collection to join with
                localField: 'provider', // Field from the Job collection
                foreignField: '_id', // Field from the Users collection
                as: 'providerDetails' // Alias for the joined collection
              }
            },
            {
              $unwind: '$providerDetails' // Unwind the joined collection if necessary
            },{
              $project: {
                _id: 1,
                jobName:1,
                description:1,
                loc:1,
                workingDays:1,
                timing:1,
                provider:'$providerDetails',
                avgSal:1,
                location: 1,
                applicants:1,
                distance: {$round:[{$divide: ['$distance', 1000]},2] } // Convert distance to kilometers
              }
            }
          ]);
      
          res.status(200).json(jobs);
       }
       catch(err)
       {
        console.log(err)
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
       }
})
const sortByDistance = asyncHandler(async (req, res) => {
  try {
  const geocodedAddressResponse = await geocodeAddress(req.params.location);
  if (!geocodedAddressResponse || !geocodedAddressResponse.Results || !geocodedAddressResponse.Results.length) {
      throw new Error('Invalid location');
  }
  const geocodedAddress = geocodedAddressResponse.Results[0];
  const { longitude, latitude } = geocodedAddress;
  console.log(latitude,longitude)
      const jobs = await Job.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [longitude,latitude]
            },
            distanceField: 'distance',
            spherical: true
          }
        },  {
          $lookup: {
            from: 'users', // The collection to join with
            localField: 'provider', // Field from the Job collection
            foreignField: '_id', // Field from the Users collection
            as: 'providerDetails' // Alias for the joined collection
          }
        },
        {
          $unwind: '$providerDetails' // Unwind the joined collection if necessary
        },{
          $project: {
            _id: 1,
            jobName:1,
            description:1,
            loc:1,
            workingDays:1,
            provider:'$providerDetails',
            timing:1,
            avgSal:1,
            applicants:1,
            location: 1,
            distance: {$round:[{$divide: ['$distance', 1000]},2] } // Convert distance to kilometers
          }
        }
      ]);
  
      res.status(200).json(jobs);
    } catch (error) {
      console.log('sortByDistance error:', error);
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  });
  const deleteJob=async(req,res)=>{ 
  const jobId = req.params.jobId;
  try {
    let job = await Job.findById(jobId);
    const del=await Job.deleteOne(job);
    console.log(del);
    res.status(200).json({ msg: 'Deleted' });
  } catch (err) {
    console.log('unable to delete product');
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
module.exports = { addJob,sortByDistance,jobs,sortByGeoLocation,applyForJob,getApplicants,deleteJob};

