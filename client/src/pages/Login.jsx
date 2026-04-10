import React, { useState } from 'react'
import { useContext } from 'react';
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import {toast} from 'react-toastify'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const {token,settoken,backendurl}=useContext(AppContext)
  const [state,setstate]=useState('Sign Up');
  const [email,setemail]=useState('');
  const navigate=useNavigate();
  const [password,setpassword]=useState('');
  const [name,setname]=useState('');
  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      if(state==='Sign Up'){
        const {data}=await axios.post(backendurl+'/apiback/user/register',{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          settoken(data.token)
          toast.success('Registeration Completed..')
        } else{
          toast.error(data.message)
        }
      }
      else{
        const {data}=await axios.post(backendurl+'/apiback/user/login',{email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          settoken(data.token)
          toast.success('You are now Login..')
        } else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
useEffect(()=>{
if(token){
navigate('/');
}
},[token])
  return (
   <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
<div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
  <p className='text-2xl font-semibold'>{state==='Sign Up'? "Create Account": "Log in"}</p>
  <p >Please {state==='Sign Up'? "Sign Up": "Sign in"} to book and appointments.</p>
  { 
  state==='Sign Up'?<div className='w-full '>
    <p>Full Name</p>
    <input  className='border border-zinc-300 rounded w-full p-2 m-1'
    type='text'
    value={name}
     onChange={(ev)=>setname(ev.target.value)} 
     required />
  </div>:<p></p>
  }
  
  <div className='w-full '>
    <p>Email</p>
    <input  className='border border-zinc-300 rounded w-full p-2 m-1'
    type='email'
    value={email}
     onChange={(ev)=>setemail(ev.target.value)} 
      required />
  </div>
  <div className='w-full '>
    <p>Password</p>
    <input className='border border-zinc-300 rounded w-full p-2 m-1'
    type='password'
    value={password}
     onChange={(ev)=>setpassword(ev.target.value)} 
      required />
  </div>
  <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base '>{state==='Sign Up'? "Create Account": "Log in"}</button>
{
  state==="Sign Up"?
  <p>Already have an account? <span onClick={()=>setstate('Logn In')} className='text-primary underline cursor-pointer'>Login here</span></p> :
   <p>Create an new account? <span onClick={()=>setstate('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
}
</div>
   </form>
  )
}

export default Login