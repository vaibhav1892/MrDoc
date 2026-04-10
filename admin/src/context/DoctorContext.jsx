import { useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
export const DoctorContext = createContext()
const DoctorContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [dtoken, setdtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
    const [appointments, setappointments] = useState([])
    const [dashdata,setdashdata]=useState(false)
    const[profile,setprofile]=useState(false)
    const getappointments = async () => {
        try {
            const { data } = await axios.get(backendurl + '/apiback/doctor/appointments', { headers: { dtoken } })
            console.log(data)
            if (data.success) {
                setappointments(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendurl + '/apiback/doctor/complete', { appointmentId }, { headers: { dtoken } })
            if (data.success) {
                toast.success(data.message)
                getappointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendurl + '/apiback/doctor/cancel', { appointmentId }, { headers: { dtoken } })
            if (data.success) {
                toast.success(data.message)
                getappointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const getdashdata=async()=>{
       try {
        const {data}=await axios.get(backendurl+'/apiback/doctor/dashboard',{headers:{dtoken}})
        console.log(data);
        if(data.success){
            setdashdata(data.dashData)
        } else{
            toast.error(data.message)
        }
       } catch (error) {
        console.log(error)
        toast.error(error.message)
       } 
    }
    const getprofileData=async()=>{
        try {
          const {data}=await axios.get(backendurl+'/apiback/doctor/profile',{headers:{dtoken}})
          console.log(data)
          if(data.success){
             setprofile(data.profileData)
             
          }  
        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }
    }
    const value = {
        backendurl,
        dtoken,
        setdtoken,
        getappointments,
        appointments,
        setappointments,
        cancelAppointment,
        completeAppointment,
        getdashdata, dashdata,setdashdata,
        profile,setprofile,getprofileData,
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider