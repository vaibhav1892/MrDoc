import axios from 'axios'
import { createContext, useEffect, useState} from 'react'
import { toast } from 'react-toastify'
export const AdminContext=createContext()
const AdminContextProvider=(props)=>{
    const [atoken,setatoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const [doctors,setdoctors]=useState([])
    const [appointments,setappointments]=useState([])
    const backendurl= import.meta.env.VITE_BACKEND_URL
    const [dashdata,setdashdata]=useState(false)
    const getalldoctors = async () => {
        try {
            const { data } = await axios.post(
                backendurl + "/apiback/admin/all-doctor",
                {},
                {headers:{atoken}} 
            );
            
            console.log(data);
    
            if (data.success) {
                setdoctors(data.doctors); 
               
                console.log("Doctors fetched successfully");
            } else {
                toast.error(data.message); 
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error(`Error: ${error.message}`); // Handle any error during the request
        }
    };
    const changeavailability=async(docId)=>{
        try {
         const {data}=await axios.post(backendurl+'/apiback/admin/change-availability',{docId},{headers:{atoken}}) 
         if(data.success){
            toast.success(data.message)
            getalldoctors()
         }  
         else{
         toast.error(data.message)
         }
        } catch (error) {
          console.log(error);
          toast.error('An Error occured..')  
        }
    }
 const getallappointments=async()=>{
    try {
       const {data}=await axios.get(backendurl+'/apiback/admin/appointments',{headers:{atoken}}) 
       
       if(data){
        console.log(data);
           setappointments(data)
         

        } else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error('An Error occured..')
    }
 }
 const cancelappointment=async(appointmentId)=>{
    try {
       const {data}=await axios.post(backendurl+'/apiback/admin/admincancel',{appointmentId},{headers:{atoken}}) 
       if(data.success){
        toast.success(data.message)
        getallappointments()
       } else{
        toast.error(data.message)
       }
    } catch (error) {
        console.log(error);
        toast.error('An Error occured..') 
    }
 }
  const getdashdata=async()=>{
    try {
        const {data}=await axios.get(backendurl+'/apiback/admin/dashboard',{headers:{atoken}})
       
        if(data.success){
            setdashdata(data.dashBoard)
          
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error('An Error occured..') 
    }
  }
  console.log(dashdata)
   const value={
       atoken,setatoken,
       backendurl,
       getalldoctors, changeavailability, 
       appointments,setappointments,getallappointments,
       doctors,
       cancelappointment,
       dashdata,getdashdata
   }  
return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
)
}
export default AdminContextProvider