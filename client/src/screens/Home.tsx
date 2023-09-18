import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import MainDash from '../components/MainDash'
import Loginform from '../components/Loginform'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


export default function Home() {

  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const [url, setUrl]: any = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  console.log(url)

  const handleLogout = async () => {
    // Add your logout logic here
    const des = window.confirm("Are you sure to logout?");
    if (!des) return;

    const res = await fetch(process.env.REACT_APP_B + '/api/logout', {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.status === 200) {
      localStorage.removeItem('email');
      navigate('/');
    }
    
    return;
  };

  return (

    <>

      {(email === null) ?
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-dark ps-5 pe-5 pt-3 pb-3">
            <div className="container-fluid">
              <NavLink className="navbar-brand text-warning" to="/"><b>ONEPOINT</b></NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {email &&
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item ms-5">

                      <NavLink className={(url === "/bookappointments" ? "text-success nav-link" : "nav-link text-light")} to="/bookappointments"><b>Book appointments</b></NavLink>
                    </li>

                    <li className="nav-item ms-5">
                      <NavLink className={(url === "/myappointments" ? "text-success nav-link" : "nav-link text-light")} to='/myappointments'><b>My appointments</b></NavLink>
                    </li>
                    {/* <li className="nav-item dropdown ms-5">
                                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    How to Use?
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/howtostart">Getting started</Link></li>
                                    <li><Link className="dropdown-item" to="/howtobook">Booking an appointment</Link></li>
                                    <li><Link className="dropdown-item" to="/howtocancel">Cancelling an appointment</Link></li>
                                </ul>
                            </li> */}
                  </ul>
                }
                <ul className='navbar-nav mb-2 mb-lg-0'>

                  {email &&
                    // <div className="btn btn-danger ms-3" >Logout</div>

                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Settings
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><div className='nav-link text-danger' onClick={handleLogout} style={{ cursor: "pointer" }}><b>Log out</b></div></li>
                      </ul>
                    </li>
                  }



                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex row">
            <div className="col-sm-12 col-xl-8 col-lg-7 col-md-7">
              <MainDash />
            </div>
            <div className="col-sm-12 col-xl-3 col-lg-4 col-md-4">
              <Loginform />
            </div>
          </div>
        </div> :
        <div>

          <nav className="navbar navbar-expand-lg navbar-light bg-dark ps-5 pe-5 pt-3 pb-3">
            <div className="container-fluid">
              <NavLink className="navbar-brand text-warning" to="/"><b>ONEPOINT</b></NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {email &&
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item ms-5">

                      <NavLink className={(url === "/bookappointments" ? "text-success nav-link" : "nav-link text-light")} to="/bookappointments"><b>Book appointments</b></NavLink>
                    </li>

                    <li className="nav-item ms-5">
                      <NavLink className={(url === "/myappointments" ? "text-success nav-link" : "nav-link text-light")} to='/myappointments'><b>My appointments</b></NavLink>
                    </li>
                    {/* <li className="nav-item dropdown ms-5">
                                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    How to Use?
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/howtostart">Getting started</Link></li>
                                    <li><Link className="dropdown-item" to="/howtobook">Booking an appointment</Link></li>
                                    <li><Link className="dropdown-item" to="/howtocancel">Cancelling an appointment</Link></li>
                                </ul>
                            </li> */}
                  </ul>
                }
                <ul className='navbar-nav mb-2 mb-lg-0'>

                  {email &&
                    // <div className="btn btn-danger ms-3" >Logout</div>

                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Settings
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><div className='nav-link text-danger' onClick={handleLogout} style={{ cursor: "pointer" }}><b>Log out</b></div></li>
                      </ul>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex row">

            <div className="col-sm-12 col-xl-3 col-lg-4 col-md-4 m-5 shadow-lg p-3">
              <h5 style={{ color: 'darkblue', fontStyle: "italic" }}>Hey there! Here are 5 simple steps to book your appointments on your fingertips!</h5>
              <h6 className='text-success mt-3 p-2'><span className='text-danger'>Step 1:</span> Choose the date you want to book your appointment by going onto <b>Book appointments</b>  tab</h6>
              <h6 className='text-success p-2'><span className='text-danger'>Step 2:</span> Select the slot which suits you from a list of available slots </h6>
              <h6 className='text-success p-2'><span className='text-danger'>Step 3:</span> Verify the details and confirm your booking </h6>
              <h6 className='text-success p-2'><span className='text-danger'>Step 4:</span> You can access the status of the booking on <b> My appointments</b> tab </h6>
              <h6 className='text-success p-2'><span className='text-danger'>Step 5:</span> That's all! Within less than 5 steps you were able to schedule an appointment with us! </h6>

              <span className='text-danger'><b>Cancel an appointment?</b> We got you!! Do this by simply visiting My appointments tab and clicking the delete icon</span>
            </div>
            <div className="col-sm-12 col-xl-8 col-lg-7 col-md-7">
              <MainDash />
            </div>



          </div>

        </div>

      }

    </>

  )
}
