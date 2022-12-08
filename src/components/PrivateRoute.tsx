import React from 'react'
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = ({ user }: any) => {
  return user ? <Outlet /> : <Navigate to="/bug-tracker" />
}

export default PrivateRoute