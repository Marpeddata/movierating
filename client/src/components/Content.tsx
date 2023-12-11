import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../routes/Home';
import Login from '../routes/Login';

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default Content;