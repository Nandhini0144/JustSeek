import React from 'react'
import { useState } from 'react'
const AddNewForm = () => {
  const[jobType,setJobType]=useState('')
  const[otherVisible,setOtherVisible]=useState(false)
  const showorHideOtherInput=()=>{
         const selectedJobType=document.getElementById('selectOption');
         setJobType(selectedJobType.value)
         if(selectedJobType.value==="other")
         setOtherVisible(true)
         else
         setOtherVisible(false)
  }
  return (
    <div>
        {/* <label>JobType:</label>
        <select id="selectOption" onChange={showorHideOtherInput} value={jobType}>
            <option value="WatchMan">Watch Man</option>
            <option value="CareTaker">Care Taker</option>
            <option value="other">Other</option>
        </select>
        {otherVisible && (<input type="text" id="otherInput" placeholder="Enter custom text" />)} */}
        <h1 class="modal-title fs-5" id="addNewModalLabel">Add new Task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
  )
}

export default AddNewForm