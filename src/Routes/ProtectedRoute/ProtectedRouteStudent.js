import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRouteStudent({ children }) {
  const currentUser  =window.localStorage.getItem('Student_Email');

  if (!currentUser) {
    return <Navigate to='/' />
  }

  return children;
}

