import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import {DomainContext } from '../App';
import PostedJobCard from './PostedJobCard';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [List,setList]=useState([])
  const url=useContext(DomainContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${url}/api/user/retriveByUserId`);
      if (!result) {
        throw new Error('Failed to fetch products');
      }
      const json=result.data;
      setJobs(json);
      setList(json);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  const updateSearchText = (e) => {
    const val = e.target.value;
    setSearchText(val);
    filterBySearchJob(val);
  }

  const filterBySearchJob = (val) => {
    const filteredData = jobs.filter((p) => {
      return p.jobName.toLowerCase().includes(val.toLowerCase());
    })
    setList(filteredData);
  }

  return (
    <>
      <input value={searchText} onChange={updateSearchText} placeholder="Search job..." />
      <div className='job-container'>
        {List.map((ele) => (
          <PostedJobCard key={ele._id} job={ele} />
        ))}
      </div>
    </>
  );
}

export default PostedJobs;