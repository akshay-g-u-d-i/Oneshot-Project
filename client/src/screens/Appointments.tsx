import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Spinner } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Pupdel from '../Popups/Pupdel';
import { useNavigate } from 'react-router-dom';



export default function Appointments() {
    const navigate = useNavigate();

    const [email, setemail]: any = useState(localStorage.getItem('email'));
    const [date, setdate] = useState("null")
    const [time, settime] = useState("null")
    const [count, setcount] = useState(0)
    const [spin, setspin] = useState(false)
    const [popup, setpopup] = useState(false)

    const [myslots, setmyslots]: any = useState([])

    const fetchuserappointments = async () => {
        setspin(true)
        const res = await fetch(process.env.REACT_APP_B + '/api/getuserappointments', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: localStorage.getItem('email') })
        })

        var data = await res.json();
        if (res.status === 200) {
            const slots = data.slots;
            console.log("Inside successful")
            setmyslots(slots)
        }
        else if (res.status === 500) alert('Please refresh page')

        if (data.message == "unauthorized user") {
            setemail(null)
            localStorage.removeItem('email');
            navigate('/unauthorized-user');
        }

        setspin(false)

    }

    useEffect(() => {
        fetchuserappointments();
    }, [])

    useEffect(() => {

        if (count) {

            (async () => {

                if (window.confirm("Are you sure to cancel the appointment?") === false) {
                    setcount(0);
                    setdate("null");
                    return;
                }
                setspin(true)


                const res = await fetch(process.env.REACT_APP_B + '/api/deleteappointment', {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: localStorage.getItem('email'), slot: [date, time] })
                })

                const data = await res.json();

                if (data.message == "unauthorized user") {
                    setemail(null)
                    localStorage.removeItem('email');
                    navigate('/unauthorized-user');
                    return;
                }

                if (res.status === 200) {
                    setcount(0);
                    setdate("null");
                    settime("null");
                    await fetchuserappointments();
                    setpopup(true);
                    setTimeout(() => {
                        setpopup(false);
                    }, 5000);
                }
                else if (res.status == 500) {
                    alert('Servers busy. Please try again');
                }



                setspin(false)
            })()
        }


    }, [date])

    myslots.sort()

    return (
        <>

            {(email === null) ?
                <div className=' text-center mt-5'>
                    <h1 className='text-danger mt-5'>You cannot access this page without logging in.</h1>

                </div> :

                <div>

                    <Navbar />
                    <div className='ms-auto'>
                        <div className='ps-4 ms-auto' style={{ height: "40px", width: "25%" }}>
                            {popup === true && <Pupdel />}
                        </div>
                    </div>
                    <div className='mx-5 row' >

                        <div className=' col-sm-0 col-md-0 col-lg-2 col-xl-3'></div>
                        <div className='col-sm-12 col-md-12 col-lg-8 col-xl-6 shadow-lg rounded bg-dark p-4'>
                            <h4 className='text-warning'>My appointments</h4>

                            {
                                (spin === false) ?
                                    <div style={{ maxHeight: "500px", overflow: "auto" }}>
                                        {(myslots.length !== 0) ?
                                            <div>
                                                {myslots.map((ele: any, id: any) => { return <div key={id} className='d-flex row mx-5 my-2 bg-dark rounded text-white border border-4 p-2 border-success' ><div className='col-1'>{id + 1}.</div><div className='col-8 text-white'>Date: {ele[0]} <br></br> Time: {ele[1]}</div> <div className='col-2 my-auto btn btn-danger ' onClick={() => { setcount(1); setdate(ele[0]); settime(ele[1]); }}><Trash></Trash></div>  </div> })}
                                            </div> :
                                            <div className='text-info'>Oops! There are no appointments to show. Feel free to book one!</div>}

                                    </div> :
                                    <Spinner animation='border' variant='secondary'></Spinner>
                            }
                        </div>
                        <div className='col-sm-0 col-md-0 col-lg-2 col-xl-3'></div>

                    </div>


                </div>
            }

        </>
    )
}