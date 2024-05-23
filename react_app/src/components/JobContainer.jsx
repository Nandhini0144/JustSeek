import React, { useEffect, useState,useContext } from 'react'
import JobCard from './JobCard'
import Add from './Add'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {DomainContext } from '../App';
import { useAuth } from './AuthContext';

const JobContainer = () => {
  const[jobs,setJobs]=useState([]);
  const url=useContext(DomainContext);
  const[List,setList]=useState([])
  const[jobType,setJobType]=useState(true)
  const[location,setLocation]=useState(false)
  const[searchText,setSearchText]=useState('')
  const { authenticated } = useAuth(); 

  const navigate = useNavigate();
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData=async()=>{
      const result= await fetch(`${url}/api/job/alljobs`);
      if (!result.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const json = await result.json();
      setJobs(json);
      setList(json);
      // console.log(json)
  }
  const changeByJobType=()=>{
      setJobType(true)
      setLocation(false)
  }
  const changeByLocation=()=>{
       setLocation(true)
       setJobType(false)
  }
  const updateSearchText=(e)=>{
    setSearchText(e.target.value);
    if(jobType==true)
    filterBySearchJobType(e.target.value);
    else if(location==true)
    filterBySearchLocation(e.target.value);
  }
  const filterBySearchJobType=(val)=>{
    const filteredData=jobs.filter((r)=>{
      return(r.jobName.toLowerCase().includes(val.toLowerCase()))
    })
    setList(filteredData)
  }
  const filterBySearchLocation=(val)=>{
    const filteredData=jobs.filter((r)=>{
      return(r.loc.toLowerCase().includes(val.toLowerCase()))
    })
    setList(filteredData);
  }
  const sortByDistance=async()=>{

    const result = await axios.get(`${url}/api/job/sortByDistance`);
    console.log(result.data)
    setList(result.data);
  }
  const addJob=()=>{
    navigate('/add')
  }
  return (
    <>
    <span>
      <button onClick={changeByJobType}>JobType</button>
    </span>
    <span>
      <button onClick={changeByLocation}>Location</button>
    </span>
    <div>
      <input value={searchText} onChange={updateSearchText}/>
    </div>
    {console.log(authenticated)}
    {authenticated?
     <div>
     <button onClick={sortByDistance}>SortByDefaultLocation</button>
   </div>
   :
   <div>
    Login to sort by distance</div>}
   
    <div className='AddNewButton'>
    <button onClick={addJob}>AddNew</button> 
    </div>
    {console.log(List)}
    <div> 
      {
        List.map((res)=>{
          return <JobCard key={res._id} job={res}/>
        })
      }
    </div>
    </>
  )
}

export default JobContainer