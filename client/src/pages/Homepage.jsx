import React from 'react'
import HeaderPage from '../components/Header'
import SpecialityBox from '../components/Speicality'
import TopDoctors from '../components/TopDoctors'
import BannerPage from '../components/Banner'

const Homepage = () => {
  return (
    <div>
      <HeaderPage/>
      <SpecialityBox/>
      <TopDoctors/>
      <BannerPage/>
    </div>
  )
}

export default Homepage