import React from 'react'
import {Dialog,DialogTitle,DialogContent} from '@mui/material'
import AddNewForm from './AddNewForm';
const AddJobs = (props) => {
  const{openPopUp,setOpenPopUp}=props;
  return (
    <>
     <Dialog open={openPopUp} className='AddNewDialog'>
      <>
           <button onClick={()=>{setOpenPopUp(false)}}>X</button>
           <AddNewForm/>
      </>
     </Dialog>
    </>
  )
}

export default AddJobs