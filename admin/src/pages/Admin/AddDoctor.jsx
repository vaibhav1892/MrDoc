import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import axios from 'axios'
const AddDoctor = () => {
  const [docimg, setdocimg] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [experience, setexperience] = useState('1 Year');
  const [fee, setfee] = useState('');
  const [about, setabout] = useState('');
  const [address1, setaddress1] = useState('');
  const [address2, setaddress2] = useState('');
  const [speciality, setspeciality] = useState('General physician');
  const [degree, setdegree] = useState('');
  const { backendurl, atoken } = useContext(AdminContext);
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docimg) {
        return toast.error('Image not selected');
      } 
      const formdata = new FormData();
      formdata.append('image', docimg);
      formdata.append('name', name); 
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('experience', experience);  
      formdata.append('fee', Number(fee));
      formdata.append('about', about); 
      formdata.append('speciality', speciality);
      formdata.append('degree', degree);
      formdata.append('address', JSON.stringify({ line1: address1, line2: address2 }));
      formdata.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const { data } = await axios.post(`${backendurl}/apiback/admin/add-doctor`, formdata,{headers:{atoken}});
      if (data.success) {
        toast.success(data.message);
        setdocimg(false)
        setname('')
        setemail('')
        setpassword('')
        setabout('')
        setaddress1('')
        setaddress2('')
        setdegree('')
        setfee('')
        setspeciality('General physician')
        setexperience('1 Year')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add doctor. Please try again.");
    }
  };
  

  return (
    <form className='m-5 w-full' onSubmit={onsubmitHandler}>
      <p className='mb-3 text-lg font-medium '>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll '>
        <div className='flex items-center text-gray-500 gap-4 mb-8 '>
          <label htmlFor='doc-img'>
            <img
              className='w-16 bg-gray-100 cursor-pointer rounded-full'
              src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}
              alt=''
            />
          </label>
          <input onChange={(ev) => setdocimg(ev.target.files[0])} type='file' id='doc-img' hidden />
          <p>Upload doctor <br /> pictures</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Doctor name</p>
              <input onChange={(ev) => setname(ev.target.value)} value={name} className='border rounded px-3 py-2' type='text' placeholder='Name' required />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Doctor email</p>
              <input onChange={(ev) => setemail(ev.target.value)} value={email} className='border rounded px-3 py-2' type='email' placeholder='Email' required />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(ev) => setpassword(ev.target.value)} value={password} className='border rounded px-3 py-2' type='password' placeholder='Password' required autoComplete="current-password" />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(ev) => setexperience(ev.target.value)} value={experience} className='border rounded px-3 py-2'>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
                ))}
              </select>
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Fee</p>
              <input onChange={(ev) => setfee(ev.target.value)} value={fee} className='border rounded px-3 py-2' type='number' placeholder='Fee' required />
            </div>
          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(ev) => setspeciality(ev.target.value)} value={speciality} className='border rounded px-3 py-2'>
                {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Education</p>
              <input onChange={(ev) => setdegree(ev.target.value)} value={degree} className='border rounded px-3 py-2' type='text' placeholder='Education' required />
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p>Address</p>
              <input onChange={(ev) => setaddress1(ev.target.value)} value={address1} className='border rounded px-3 py-2' type='text' placeholder='Address1' required />
              <input onChange={(ev) => setaddress2(ev.target.value)} value={address2} className='border rounded px-3 py-2' type='text' placeholder='Address2' required />
            </div>
          </div>
        </div>
        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(ev) => setabout(ev.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='About the doctor' rows={5} required />
        </div>
        <button type='submit' className='bg-primary px-10 py-3 mt-4'>Add Doctor</button>
      </div>
    </form>
  )
}
export default  AddDoctor
