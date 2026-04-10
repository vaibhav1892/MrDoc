import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row gap-12 my-10'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>At Mr Doc , we believe that managing healthcare should be simple, accessible, and stress-free. Our platform is designed to connect patients with healthcare professionals effortlessly, bringing quality healthcare closer to everyone. With just a few clicks, patients can find and book appointments with qualified doctors across various specialties, ensuring that they get the care they need when they need it.</p>
          <p>We understand the importance of streamlined healthcare experiences for both patients and doctors. For patients, our user-friendly interface makes it easy to search, schedule, and manage appointments, all from one secure platform. For doctors, DocCare offers tools to manage their schedules, view patient details, and track earnings in one place, making practice management more efficient.</p>
          <b className='text-gray-800 '>Our Mission</b>
          <p>Our mission is to make healthcare more accessible while supporting medical professionals in delivering the highest quality of care. From personalized search options to real-time booking confirmations, DocCare is here to ensure that healthcare is never more than a click away.</p>
        </div>
      </div>
       <div className='mb-8'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
       </div>
       <div className='flex flex-col md:flex-row mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-16 text-gray-700 flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 cursor-pointer '>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
        <b>Convenience:</b>
        <p>Access to a netwrok of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 text-gray-600 cursor-pointer '>
        <b>Personalization:</b>
        <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
       </div>
    </div>
  )
}

export default About