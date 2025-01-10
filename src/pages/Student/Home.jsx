import React from 'react'
import Cookies from 'js-cookie'
const Home = () => {
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
      };
  return (
    <div>
      student home
      <button onClick={handleLogout} >
        Logout
      </button>
    </div>
  )
}

export default Home
