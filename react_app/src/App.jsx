import { useState,useEffect } from 'react'
import Header from './components/Header'
import React from 'react';
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom'
import './App.css'
import JobContainer from './components/JobContainer';
import Login from './components/Login'
import Register from './components/Register'
import Add from './components/Add';
import HomePage from './components/HomePage';
import {AuthProvider} from './components/AuthContext'
import PostedJobs from './components/PostedJobs';
import AppliedJobs from './components/AppliedJobs';
import Profile from './components/Profile';
// const socket = io("http://172.16.132.224:5000");
const url="https://justseek-3.onrender.com";
// export const SocketContext = React.createContext();
// export const SocketContextAd=React.createContext();
export const DomainContext=React.createContext();

const Home=()=>{
  
  return(<>
  <Header/>
  <Outlet/>
  </>)
}
const router=createBrowserRouter([{
  path:'/',
  element:<Home/>
  ,children:[
    {
      path:'/',
      element:<HomePage/>
    },{
    path:'/jobs',
    element:<JobContainer/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/add',
    element:<Add/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/postedJobs',
    element:<PostedJobs/>
  },
  {
    path:'/appliedJobs',
    element:<AppliedJobs/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }
]
}])

function App() {
  return (
    <DomainContext.Provider value={url}>
    <AuthProvider>
    {/* <SocketContext.Provider value={socket}> */}
      <RouterProvider router={router} />
    {/* </SocketContext.Provider> */}
    </AuthProvider>
    </DomainContext.Provider>
  )
}

export default App
