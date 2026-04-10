import React, { useContext } from 'react'
import { assets} from '../assets/assets_admin/assets.js'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext.jsx'
const Navbar = () => {
    const {atoken,setatoken}=useContext(AdminContext)
    const {dtoken,setdtoken}=useContext(DoctorContext)
    const logout=()=>{
        navigate('/')
       atoken && setatoken('')
       atoken && localStorage.removeItem('atoken')
       dtoken && setdtoken('')
       dtoken && localStorage.removeItem('dtoken')
    }
    const navigate=useNavigate();
  return (
    <div className='flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-b'>
     <div className='flex items-center gap-1 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=''/>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm sm:px-6 px-10 py-2 rounded-full '>LogOut</button>   
    </div>
  )
}

export default Navbar
