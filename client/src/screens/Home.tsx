import React from 'react'
import Navbar from '../components/Navbar'
import MainDash from '../components/MainDash'
import Loginform from '../components/Loginform'

export default function Home() {
  
  return (
    <div>
      <Navbar />
      <div className="d-flex row">
        <div className="col-sm-12 col-xl-8 col-lg-7 col-md-7">
          <MainDash />
        </div>
        <div className="col-sm-12 col-xl-3 col-lg-4 col-md-4">
          <Loginform />
        </div>
      </div>

    </div>

  )
}
