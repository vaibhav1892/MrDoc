import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const FooterPage = () => {
  return (
    <div className='md:mx-10'>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ----Left Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt=''/>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>MrDoc is a smart and user-friendly healthcare platform designed to simplify the process of booking doctor appointments. Our system allows patients to easily find trusted doctors, view their availability, and book appointments instantly</p>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>We aim to provide a seamless and hassle-free experience by connecting patients with healthcare professionals in just a few clicks. Whether it’s a general consultation or a specialist visit, MrDoc ensures quick access to quality healthcare services.
Our mission is to make healthcare accessible, efficient, and reliable for everyone.</p>
        </div>
         {/* ----Centre Section */}
         <div>
           <p className='text-xl font-medium mb-5'>Company</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact</li>
            <li>Privacy policy</li>
           </ul>
         </div>
          {/* ----Right Section */}
          <div>
         <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
         <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-238-873-709-732</li>
            <li>admin@gmail.com</li>
         </ul>
          </div>
        </div> 
        {/* ----Copyright Symbol------ */}
        <div>
          <hr />
          <p className='py-5 text-center text-sm'>Copyright 2024@ Prescripto - All Right Reserved.</p> 
        </div>
    </div>

  )
}

export default FooterPage