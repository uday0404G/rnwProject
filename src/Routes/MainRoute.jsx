import React from 'react'
import Signup from '../components/Signup'
import { Route, Router, Routes } from 'react-router-dom'
import Login from '../components/Login'

import Home from '../pages/Student/Home'
import HomeDeshbord from '../pages/Teacher/Home'
import PrivateRoute from './PrivateRoute'


const MainRoute = () => {
  return (
    
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
          <Route path="/student-dashboard" element={<Home />} />
          <Route path="/teacher-dashboard" element={<HomeDeshbord />} />
      </Route>
    </Routes>
 
  
  )
}

    export default MainRoute
