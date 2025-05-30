
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import  Add from './pages/Add/Add'
import Order from "./pages/Order/Order"

import List from './pages/List/List'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "https://foodie-backend-azqw.onrender.com"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">

      <Sidebar/>

       <Routes>
        <Route  path='/add'  element = {<Add    url={url}/>}  />
        <Route  path='/list'  element = {<List  url={url} />}  />
         <Route  path='/order'  element = {<Order url={url} />}  />
        
        

       </Routes>
      </div>
    </div>
  )
}

export default App
