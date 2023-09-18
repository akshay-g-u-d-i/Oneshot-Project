import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink, useLocation } from 'react-router-dom';



export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = localStorage.getItem('email');


    const [url, setUrl]: any = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    const handleLogout = async() => {
        // Add your logout logic here
        let des = window.confirm("Are you sure to logout?")
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
        <div id='rot'>

            <nav className="navbar navbar-expand-lg navbar-light bg-dark ps-5 pe-5 pt-3 pb-3">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-warning" to='/'><b>ONEPOINT</b></NavLink>
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

            {/* <h1>Hi</h1> */}


        </div>
    )
}
