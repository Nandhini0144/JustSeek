import React from 'react'
import {useContext,useState} from 'react'
import {useAuth} from './AuthContext'
import axios from 'axios'
import {DomainContext } from '../App';
import { useNavigate } from 'react-router-dom';

const JobCard = (props) => {
    const{job}=props;
    const{location}=useAuth();
    const{userId}=useAuth();
    const{authenticated}=useAuth();
    const{gLocation}=useAuth();
    const [applied, setApplied] = useState(false);
    const url=useContext(DomainContext);
    const navigate = useNavigate();
    function distance(lat1, lon1, lat2, lon2) {
      const r = 6371;
      const p = Math.PI / 180;
      const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                    + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                      (1 - Math.cos((lon2 - lon1) * p)) / 2;
      console.log(lat1,lon1,lat2,lon2)
      
      return 2 * r * Math.asin(Math.sqrt(a));
    }
  const jobApply=async()=>{
    // console.log(job)
    if(!authenticated)
      {
        navigate('/login')
      }
    const result=await axios.get(`${url}/api/job/applyForJob/${job._id}`)
    console.log(result.status)
    if (result.status===200) {
      setApplied(true); // Set the job as applied if the request is successful
    }
  }
  
  return (
   
    <div className='jobCard'>
    <div>Title :{job.jobName}</div>
    <div>Description:{job.description}</div>
    <div>Salary:{job.avgSal}</div>
    <div>Working hours details:{job.workingDays} {job.timing}</div>
    <div>Location :{job.loc}</div>
    {
      job.distance ?
      <div>{job.distance} Km</div>
      : 
      gLocation &&
      <div>{parseFloat(distance(gLocation.coordinates.latitude,gLocation.coordinates.longitude,job.location.coordinates[1],job.location.coordinates[0]).toFixed(2))}Km</div>
}
{/* {console.log(job.provider,userId)} */}
{console.log(job)}
{console.log(job.applicants)}
{   

(userId && ((job.applicants && job.applicants.includes(String(userId))) || (job.provider._id==userId)) ) ?
  <div>
  <button onClick={jobApply} disabled='true'>Apply</button>
     { job.provider._id!=userId && <div>You have applied for this job</div>}
  </div>
      :
  <button onClick={jobApply} disabled={applied}>Apply</button>
}
</div>
  )
}

export default JobCard