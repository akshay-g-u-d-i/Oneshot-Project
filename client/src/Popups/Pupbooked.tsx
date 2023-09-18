import React, { useEffect, useState } from 'react'
import './Popup1.css'

export default function Pupbooked() {

    const [timer, settimer] = useState(2000);
    const [popup, setpopup]:any = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            settimer(timer-1);
        }, 1);
        
        if (timer===0)
        {
            setpopup(false);
        }
        // console.log(timer)
    }, [timer])
    

    return (
        <>{popup === true ?
        <div className='p-2'>
            <div className=" shadow-lg rounded bg-success text-white">
                <div>
                    <h6 className='text-white pt-2 ps-2'>Appointment scheduled successfully!!</h6>
                </div>
                <div className="popup-timer-bar" style={{ width: `${(timer / 2000) * 100}%` }}></div>
                {/* <button onClick={closePopup}>Close</button> */}
            </div>
        </div>: <></>}
        </>
    )
}
