import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRoute from './Routes/MainRoute'
import CourseLearning from './pages/Student/CourseLearning';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/student-dashboard/course/:courseId" element={<CourseLearning />} />
      </Routes>
      <MainRoute />
      
    </>
  )
}

export default App
