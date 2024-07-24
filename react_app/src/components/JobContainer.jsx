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
  const[searchLocation,setSearchLocation]=useState('')
  const { authenticated } = useAuth(); 
  const {gLocation}=useAuth();
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
  const updateSearch=(e)=>{
      setSearchLocation(e.target.value);
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
  // const sortByDistance=async()=>{

  //   const result = await axios.get(`${url}/api/job/sortByDistance`);
  //   console.log(result.data)
  //   setList(result.data);  
  // }
  const sortByCurrentLocation=async()=>{
    try{
      if(!gLocation)
        {
          alert('Allow access to location to sort by Geo location')
        }else{
      const result=await axios.get(`${url}/api/job/sortByGeoLocation/${gLocation.coordinates.latitude}/${gLocation.coordinates.longitude}`)
      setList(result.data)}
    }
    catch(err)
    {
      console.log(err)
    }
  }
  const sortByManualDistance=async()=>{
    try{
    const result=await axios.get(`${url}/api/job/sortByDistance/${searchLocation}`)
    console.log(result.data)
    setList(result.data);
    }
    catch(err)
    {
      alert("provide valid location")
    }
  }
  const addJob=()=>{
    navigate('/add')
  }
  return (
    <div className='jobContainer'>
    <span>
      <button onClick={changeByJobType}>JobType</button>
    </span>
    <span>
      <button onClick={changeByLocation}>Location</button>
    </span>
    <div>
      <input value={searchText} onChange={updateSearchText}/>
    </div>
    <button onClick={sortByCurrentLocation}>Sort by geo location</button>
    { console.log(authenticated)}
      <input value={searchLocation} placeholder='Enter location to find Distance' onChange={updateSearch}/>
      <button onClick={sortByManualDistance}>submit</button>
    <div className='AddNewButton'>
    <button onClick={addJob}>+</button> 
    </div>
    {console.log(List)}
    <div> 
      {
        List.map((res)=>{
          return <JobCard key={res._id} job={res}/>
        })
      }
    </div>
    </div>
  )
}

export default JobContainer


