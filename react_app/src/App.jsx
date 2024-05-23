import { useState } from 'react'
import Header from './components/Header'
import React from 'react';
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom'
import './App.css'
import JobContainer from './components/JobContainer';
import Login from './components/Login'
import Register from './components/Register'
import Add from './components/Add';
import {AuthProvider} from './components/AuthContext'
// const socket = io("http://172.16.132.224:5000");
const url="http://localhost:5000";
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
  ,children:[{
    path:'/',
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
