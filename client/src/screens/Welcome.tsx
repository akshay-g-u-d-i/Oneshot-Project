import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { format, startOfMonth, getMonth, getYear, eachDayOfInterval, addMonths, subMonths, isBefore, startOfToday } from 'date-fns';
import { enGB } from 'date-fns/locale';
import '../components/Calendar.css';
import { totalslots } from '../components/helper';
import Spinner from 'react-bootstrap/Spinner';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons';
import Pupbooked from '../Popups/Pupbooked';
import { useNavigate } from 'react-router-dom';


export default function Welcome() {
  const navigate = useNavigate();
  var email = localStorage.getItem('email');
  // const [bookedslots, setbookedslots] = useState(null)
  const [availslots, setavailslots]: any = useState([])
  const [chosenslot, setchosenslot] = useState("null");
  const [count, setcount] = useState(0)
  const [spin, setspin] = useState(false)
  const [popup, setpopup] = useState(false)
  var nowtime = new Date().toLocaleTimeString().substring(0, 5);
  var nowdate = new Date().toLocaleDateString();

  // For calendar
  const [currentDate, setCurrentDate] = useState(new Date());
  const [chosendate, setchosendate] = useState("null");

  useEffect(() => {

    (async () => {
      setspin(true)
      const res = await fetch(process.env.REACT_APP_B + '/api/getappointments', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ date: chosendate })
      })

      const data = await res.json();
      // setbookedslots(data.bookedslots);
      let bookedslots = data.bookedslots;
      var temp = []

      for (let slot1 of totalslots) {
        let found = 0;
        if (bookedslots != null)
          for (let slot2 of bookedslots) {
            if (slot1 === slot2) {
              found = 1;
              break;
            }
          }
        if (found === 0) {
          if (chosendate === nowdate && slot1 > nowtime)
            temp.push(slot1);
          else if (chosendate !== nowdate) temp.push(slot1);

        }
      }

      setavailslots(temp);
      setspin(false);

    })()
  }, [chosendate])

  const createappointment = async () => {
    setspin(true);
    const res = await fetch(process.env.REACT_APP_B + '/api/createappointment', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: localStorage.getItem('email'), date: chosendate, slot: chosenslot })
    })

    let data = await res.json();

    if (data.message == "unauthorized user") {
      email = null;
      localStorage.removeItem('email');
      navigate('/unauthorized-user');
      return;
    }

    if (res.status === 200) {
      // alert('Your appointment booked successfully!');
      setpopup(true);
      setchosenslot("null"); setcount(0); setchosendate("null");
      setTimeout(() => {
        setpopup(false);
      }, 5000);

    }
    else {
      alert('Server busy. Please try again')
      setchosenslot("null"); setcount(0); setchosendate("null");
    }
    setspin(false);

  }

  // Calculate the days in the current month
  const start = startOfMonth(currentDate);
  const end = new Date(getYear(currentDate), getMonth(currentDate) + 1, 0);
  const monthDates = eachDayOfInterval({ start, end });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // For slot booking

  return (
    <>

      {(email === null) &&
        <div className=' text-center mt-5'>
          <h1 className='text-danger mt-5'>You cannot access this page without logging in.</h1>

        </div>}

      {email &&
        <div className='mx-auto'>
          <Navbar />
          <div className='ms-auto'>
            <div className='ps-4 ms-auto' style={{ height: "40px", width: "25%" }}>
              {popup === true && <Pupbooked />}
            </div>
          </div>
          <div className="d-flex row mx-auto">

            <div className=' ms-auto col-sm-12 col-xl-5 col-lg-5 col-md-5 text-start p-2 mt-4 rounded shadow-lg bg-dark p-5' style={{ backgroundColor: "rgba(2,71,148,255)" }}>
              <h3 className='text-light'>Meet us</h3>
              <div>
                <div className="calendar-header row mt-4 p-2 rounded">

                  <div className='col-xl-2 col-sm-2 col-lg-2 col-md-2 btn' onClick={() => { handlePrevMonth(); setchosenslot("null"); setcount(0); setchosendate("null") }}><ArrowLeftCircle size={30} className='text-white' /></div>
                  <div className='col-xl-6 col-sm-8 col-lg-8 col-md-8 text-center btn btn-dark text-warning'><h4>{format(currentDate, 'MMMM yyyy', { locale: enGB })} </h4></div>
                  <div className='col-xl-2 col-sm-2 col-lg-2 col-md-2 btn' onClick={() => { handleNextMonth(); setcount(0); setchosenslot("null"); setchosendate("null") }}><ArrowRightCircle size={30} className='text-white' /></div>
                </div>
                <div className="calendar rounded p-2">
                  {monthDates.map((day) => (
                    <button className='date-button'
                      key={day.getTime()}
                      onClick={() => { setchosendate(format(day, 'dd/MM/yyyy')); setcount(1); setchosenslot("null"); }}
                      disabled={isBefore(day, startOfToday())}
                      style={(format(day, 'dd/MM/yyyy') === chosendate) ? { backgroundColor: "yellow", borderRadius: "50%" } : {}}
                    >
                      <b>{format(day, 'd')}</b>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="me-auto mt-4 col-sm-12 col-xl-5 col-lg-6 col-md-6 shadow-lg p-2 p-5">


              <h3>Available slots  </h3>
              {(spin === false) ?
                <div>
                  {(chosendate !== "null") && <div className='btn btn-warning m-2'>Chosen date: <b>{chosendate}</b> </div>}
                  {(count === 0) && <div>Select date to see available slots</div>}
                  {(availslots.length === 0 && count !== 0) && <h4 className='text-danger mt-2'>Sorry, no slots are available on this day</h4>}
                  {(availslots.length !== 0 && count !== 0) &&
                    <div className=' rounded mx-auto p-2'>{availslots.map((ele: any, id: any) => {
                      return <div key={id} className='slot-button btn border border-3 rounded m-2' style={chosenslot==ele? {backgroundColor:'green', color:'white'}:{}} onClick={() => { setchosenslot(ele); }}>{ele}</div>
                    })}</div>
                  }

                  {(chosenslot !== "null") &&
                    <div>
                      <div className='border-top border-3 pt-2 rounded m-1 mt-3'>
                        <div className='d-inline m-2 text-dark'>Date: <b>{chosendate} |</b> </div>
                        <div className='d-inline mt-2 text-dark'>Slot timings: <b>{chosenslot}</b> </div>
                        <div className='btn btn-danger m-2' onClick={createappointment}><b>Confirm booking</b> </div>
                      </div>
                    </div>
                  }

                </div> : <Spinner className='mt-2' animation='border' variant='secondary'></Spinner>
              }


            </div>
          </div>


        </div >
      }


    </>

  )
}
