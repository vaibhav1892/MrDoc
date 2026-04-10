import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

// Create a context for the app
export const AppContext = createContext();

const AppContextProvider = (props) => {
    // Constants and state variables
    const currencySymbol = "$";
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
   const [token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false );
    // Context value to provide globally
   
   const [userdata,setuserdata]=useState(false)
    // Fetch doctors' data from the backend
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendurl}/apiback/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors data:", error);
            toast.error("Network error. Check your backend connection.");
        }
    };
    const loadUserpROFILE=async()=>{
        try {
         const {data}=await axios.get(backendurl+'/apiback/user/get-profile',{headers:{token}})
         console.log(data)
         if(data.success){
           
            setuserdata(data.UserData)
            
         }   else{
            toast.error(data.message)
         }
        } catch (error) {
           console.log(error)
           toast.error(error.message) 
        }
    }
    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        settoken,
        backendurl,
        userdata,
        setuserdata,
        loadUserpROFILE,
    };
    // Fetch data on component mount
    useEffect(() => {
        getDoctorsData();
    }, []);
    useEffect(()=>{
    if(token){
        loadUserpROFILE()
    } else{
        setuserdata(false)
    }
    },[token])

    // Render the context provider
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
