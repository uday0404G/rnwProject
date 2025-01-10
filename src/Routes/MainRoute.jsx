import React from 'react'
import Signup from '../components/Signup'
import { Route, Router, Routes } from 'react-router-dom'
import Login from '../components/Login'
import StudentLayout from '../components/student/StudentLayout'
import Home from '../pages/Student/Home'
import MyCourses from '../pages/Student/MyCourses'
import Profile from '../pages/Student/Profile'
import TeacherLayout from '../components/teacher/TeacherLayout'
import TeacherDashboard from '../pages/Teacher/Home'
import PrivateRoute from './PrivateRoute'
import Students from '../pages/Teacher/Students'
import Courses from '../pages/Teacher/Courses'
import TeacherProfile from '../pages/Teacher/Profile'
import StudentDetails from '../pages/Teacher/StudentDetails'
import TeacherDetails from '../pages/Teacher/TeacherDetails'

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="/student-dashboard" element={<StudentLayout />}>
          <Route index element={<Home />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/teacher-dashboard" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:studentId" element={<StudentDetails />} />
          <Route path="courses" element={<Courses />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="teachers/:teacherId" element={<TeacherDetails />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default MainRoute
