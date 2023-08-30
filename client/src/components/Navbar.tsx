import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    const email = localStorage.getItem('email');

    const gotomyappointments = () => {
        navigate('/myappointments')
    }

    const handlelogout = () => {

        if(window.confirm("Are you sure to logout?")=== false) return;
        localStorage.removeItem('email');
        navigate('/');
    }
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-dark ps-5 pe-5 pt-3 pb-3">
                <div className="container-fluid">
                    <div className="navbar-brand text-warning"><b>ONEPOINT</b></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item ms-5">
                                <Link className='nav-link text-light' to={(email?"/welcome":"/")}>Home</Link>
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
                        <form className="d-flex">
                            {email &&
                                <>
                                    <div className="btn btn-success " onClick={gotomyappointments}><b>My appointments</b></div>
                                    <div className="btn btn-danger ms-3" onClick={handlelogout}>Logout</div>

                                </>
                            }

                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
