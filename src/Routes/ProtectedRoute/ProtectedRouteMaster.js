import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRouteMaster({ children }) {
  const currentUser  =window.localStorage.getItem('Master_Email');

  if (!currentUser) {
    return <Navigate to='/' />
  }

  return children;
}



