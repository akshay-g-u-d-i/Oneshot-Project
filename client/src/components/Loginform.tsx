import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'

export default function Loginform() {

    const [gmail, setGmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [spin, setspin] = useState(false)
    const navigate = useNavigate();


    const handleSendOtp = async (e: any) => {


        if (gmail === '' || !gmail.includes(".") || !gmail.includes("@")) {
            alert('Enter valid email');
            return;
        }
        setspin(true)

        const res = await fetch(process.env.REACT_APP_B + '/api/generateotp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: gmail })
        })

        if (res.status === 200) {
            setOtpSent(true);
        }
        else {
            alert('Please try again. Enter valid gmail');
        }
        setspin(false)
    };

    const handleSubmit = async () => {

        if (gmail === '' || otp === '') {
            alert('Fields cannot be empty');
            return;
        }
        setspin(true);
        const res = await fetch(process.env.REACT_APP_B + '/api/loginuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: gmail, otp: otp })
        })

        if (res.status !== 200) {
            alert('Incorrect details. Please try again');
            setspin(false);
            return;
        }
        setspin(false);

        localStorage.setItem('email', gmail);
        navigate("/welcome");

    };

    return (
        <div className='shadow-lg p-5 rounded-3 mt-5'>
            <h4 className='d-flex mb-4'>Login</h4>
            <form>
                <div className="mb-3">
                    <label htmlFor="gmail" className="form-label d-flex" >
                        Gmail
                    </label>
                    <input
                        type="email"
                        placeholder='Enter your gmail here'
                        className="form-control"
                        id="gmail"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                    />
                </div>

                {otpSent ? (
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label d-flex">
                            OTP
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Enter the OTP you received'
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                ) : null}

                {(spin === false) ?

                    <button
                        type="button"
                        className="btn btn-success mt-2"
                        onClick={otpSent ? handleSubmit : handleSendOtp}
                    >
                        {otpSent ? 'Submit' : 'Send OTP'}
                    </button>
                    :

                    <Spinner className='mt-3 mx-auto' animation='border' variant='secondary'></Spinner>


                }
            </form>
        </div>
    )
}