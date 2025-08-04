import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar'

function DashboardLayout({children}) {
    const {user} = useContext(UserContext)
  return (
    <>
        <Navbar />
        {user && <div>{children}</div>}
    </>
  )
}

export default DashboardLayout