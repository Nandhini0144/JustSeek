import React from 'react'
import {useAuth} from './AuthContext'

const JobCard = (props) => {
    const{job}=props;
    const{location}=useAuth();
    const{authenticated}=useAuth();
    const{gLocation}=useAuth();
    function distance(lat1, lon1, lat2, lon2) {
      const r = 6371; // km
      const p = Math.PI / 180;
      const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                    + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                      (1 - Math.cos((lon2 - lon1) * p)) / 2;
      console.log(lat1,lon1,lat2,lon2)
      
      return 2 * r * Math.asin(Math.sqrt(a));
    }
  return (
   
    <div className='jobCard'>
    <div>{job.jobName}</div>
    {
      gLocation && 
      // console.log(job.location.coordinates[0],job.location.coordinates[1],location.coordinates[0],location.coordinates[1])
      <div>{distance(gLocation.coordinates.latitude,gLocation.coordinates.longitude,job.location.coordinates[1],job.location.coordinates[0])}</div>
    // <div>{distance(job.location.coordinates[0],job.location.coordinates[1],location.coordinates[0],location.coordinates[1])}</div>
}
    </div>
  ) 
}

export default JobCard