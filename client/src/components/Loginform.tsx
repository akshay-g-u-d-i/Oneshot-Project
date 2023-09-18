import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'

export default function Loginform() {

    const [gmail, setGmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [spin, setspin] = useState(false);
    const [icdetials, seticdetials] = useState(false);
    const [validmail, setvalidmail] = useState(true);
    const navigate = useNavigate();


    const handleSendOtp = async () => {

        if (gmail === '' || !gmail.includes(".") || !gmail.includes("@")) {
            // alert('Enter valid email');
            setvalidmail(false);
            return;
        }
        setvalidmail(true);
        seticdetials(false);
        setspin(true);

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
            setvalidmail(false);
        }
        setspin(false)
    };

    const handleSubmit = async () => {

        if (gmail === '' || otp === '' || !gmail.includes(".") || !gmail.includes("@")) {
            // alert('Fields cannot be empty');
            setvalidmail(false)
            return;
        }
        setvalidmail(true);
        seticdetials(false);
        setspin(true);
        const res = await fetch(process.env.REACT_APP_B + '/api/loginuser', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: gmail, otp: otp })
        })



        if (res.status !== 200) {
            // alert('Incorrect details. Please try again');
            seticdetials(true);
            setspin(false);
            return;
        }
        setspin(false);

        console.log(res);

        localStorage.setItem('email', gmail);
        navigate("/");

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
                {(!validmail) && <h6 className='text-danger'>Gmail is invalid</h6>}

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

                
                {(icdetials) && <h6 className='text-danger'>Incorrect OTP. Please try again</h6>}

                {(spin === false) ?

                    <button
                        type="button"
                        className="btn btn-success mt-2"
                        onClick={otpSent ? handleSubmit : handleSendOtp}
                    >
                        {otpSent ? 'Sign in' : 'Send OTP'}
                    </button>
                    :

                    <Spinner className='mt-3 mx-auto' animation='border' variant='secondary'></Spinner>


                }
            </form>
        </div>
    )
}