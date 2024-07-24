import React from 'react'

const AppliedJobCard = (props) => {
  const{job}=props;
  return (
    <div className='jobCard'>
    <div>Title :{job.jobName}</div>
    <div>Description:{job.description}</div>
    <div>Salary:{job.avgSal}</div>
    <div>Working hours details:{job.workingDays} {job.timing}</div>
    <div>Location :{job.loc}</div>
    </div>
  )
}

export default AppliedJobCard;