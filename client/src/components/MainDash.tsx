import React, { useState } from 'react'

export default function MainDash() {
  // const [email, setemail]:any = useState(null)
  const email = localStorage.getItem('email')

  return (
    <div className='m-5'>
      <div className=' rounded-3 shadow-lg p-4'>
        {email === null &&
          <h5 className='text-start mb-5'>
            Oneshot presents <b>"ONEPOINT"</b> to ease the appointment booking process. Come along and experience seamless and hassle-free booking.
          </h5>
        }
        {email === null ?
          <img className='rounded d-block mx-auto' src={require('../images/appointment image.png')} alt='' width="85%" />
          : <img className='rounded d-block mx-auto' src={require('../images/loginimage.jpg')} alt='' width= "100%" />
        }
      </div>
    </div>
  )
}
