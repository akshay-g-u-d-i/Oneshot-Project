import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Spinner } from 'react-bootstrap';


export default function Appointments() {

    const [date, setdate] = useState("null")
    const [time, settime] = useState("null")
    const [count, setcount] = useState(0)
    const [spin, setspin] = useState(false)

    const [myslots, setmyslots]: any = useState([])

    const fetchuserappointments = async () => {
        setspin(true)
        const res = await fetch(process.env.REACT_APP_B + '/api/getuserappointments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: localStorage.getItem('email') })
        })

        if (res.status === 200) {
            var slots = await res.json();
            slots = slots.slots;
            setmyslots(slots)
        }
        else alert('Please refresh page')

        setspin(false)

    }

    useEffect(() => {
        fetchuserappointments();
    }, [])

    useEffect(() => {

        if (count) {

            (async () => {

                if(window.confirm("Are you sure to cancel the appointment?") === false)
                {
                    setcount(0);
                    setdate("null");
                    return;
                }
                setspin(true)
                

                const res = await fetch(process.env.REACT_APP_B + '/api/deleteappointment', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: localStorage.getItem('email'), slot: [date, time] })
                })

                if (res.status === 200) {
                    setcount(0);
                    setdate("null");
                    settime("null");
                    await fetchuserappointments();
                }
                else {
                    alert('Servers busy. Please try again');
                }

                setspin(false)
            })()
        }


    }, [date])

    myslots.sort()

    return (
        <div>
            <Navbar />
            <div className='m-5 row' >

                <div className='col-3'></div>
                <div className='col-6 shadow-lg rounded bg-dark p-3'>
                    <h4 className='text-warning'>My appointments</h4>

                    {
                        (spin === false) ?
                            <div>
                                {(myslots.length !== 0) ?
                                    <div>
                                        <h6 className=' text-danger'> Select to delete</h6>
                                        {myslots.map((ele: any, id:any) => { return <div key={id} className='btn btn-secondary text-white m-2' onClick={() => { setcount(1); setdate(ele[0]); settime(ele[1]); }}><b className='text-white'>Date: {ele[0]} <br></br> Time: {ele[1]}</b></div> })}
                                    </div> :
                                    <div className='text-info'>Oops! There are no appointments to show. Feel free to book one!</div>}

                            </div> :
                            <Spinner animation='border' variant='secondary'></Spinner>
                    }
                </div>
                <div className='col-3'></div>

            </div>
        </div>
    )
}