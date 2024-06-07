import React, { useContext, useState } from 'react';
import axios from 'axios';
import { DomainContext } from '../App';

const PostedJobCard = ({ job }) => {
  const url = useContext(DomainContext);
  const [showApplicants, setShowApplicants] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/api/job/deleteJob/${job._id}`);
      if (!response.data) {
        throw new Error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const toggleApplicants = () => {
    setShowApplicants(!showApplicants);
  };

  return (
    <div className='jobCard'>
      <div>Title: {job.jobName}</div>
      <div>Description: {job.description}</div>
      <div>Salary: {job.avgSal}</div>
      <div>Working hours details: {job.workingDays} {job.timing}</div>
      <div>Location: {job.loc}</div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={toggleApplicants}>Applicants Details</button>
      {showApplicants && (
        <div className='applicants'>
          {job.applicants.length > 0 ? (
            <ul>
              {job.applicants.map((applicant) => (
                <li key={applicant._id}>
                  Name: {applicant.name} - Email: {applicant.email}
                </li>
              ))}
            </ul>
          ) : (
            <div>No applicants available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostedJobCard;
