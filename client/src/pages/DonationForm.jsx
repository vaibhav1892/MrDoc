import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

export const DonationForm = () => {
    const { backendurl, token } = useContext(AppContext);
    
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [age, setage] = useState('');
    const [gender, setgender] = useState('');
    const [donortype, setdonortype] = useState('');
    const [organ, setorgan] = useState('');
    const [image, setimage] = useState(null);
    const [description, setdescription] = useState('');
    const [upiid,setupiid]=useState('');
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        
        console.log("Backend URL:", backendurl);
        console.log("Requesting:", `${backendurl}/apiback/user/donation-user`);

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('donortype', donortype);
        formData.append('organ', organ);
        formData.append('description', description);
        formData.append('upiid', upiid);
        if (image) {
            formData.append('image', image);
        }
        try {
            const { data } = await axios.post(
                `${backendurl}/apiback/user/donation-user`, 
                formData,
                { headers: {token} }
            );
            console.log(data);
            toast.success('Your data has been successfully submitted!');
            setfirstname('');
            setlastname('');
            setemail('');
            setimage('');
            setphone('');
            setage('');
            setorgan('');
            setdescription('');
            setupiid('');
            console.log("Response:", data);
        } catch (error) {
            console.error('Error submitting donation:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Error submitting donation");
        }
    };

    return (
        <div className='text-center text-2xl text-gray-500 p-10 bg-gray-100 min-h-screen flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded-lg p-10 w-full max-w-4xl'>
                <p className='text-gray-900 text-4xl mb-6'>ASK FOR DONATION</p>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='md:flex gap-6'>
                        <div className='w-1/2'>
                            <label className='text-gray-800 block mb-1'>First Name:</label>
                            <input value={firstname} onChange={(e) => setfirstname(e.target.value)} className='border border-gray-300 rounded-lg p-2 w-full' type='text' placeholder='First name' required />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-gray-800 block mb-1'>Last Name:</label>
                            <input value={lastname} onChange={(e) => setlastname(e.target.value)} className='border border-gray-300 rounded-lg p-2 w-full' type='text' placeholder='Last name' required />
                        </div>
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-1'>Email:</label>
                        <input value={email} onChange={(e) => setemail(e.target.value)} className='border border-gray-300 rounded-lg p-2 w-full' type='email' placeholder='Write your email' required />
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-1'>Phone:</label>
                        <input value={phone} onChange={(e) => setphone(e.target.value)} className='border border-gray-300 rounded-lg p-2 w-full' type='tel' placeholder='Write your contact number' required />
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-1'>Age:</label>
                        <input value={age} onChange={(e) => setage(e.target.value)} className='border border-gray-300 rounded-lg p-2 w-full' type='number' placeholder='Write your age here' required />
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-2'>Gender:</label>
                        <div className='flex gap-6'>
                            <label className='flex text-gray-400 gap-2'><input type='radio' name='gender' value='Male' onChange={(e) => setgender(e.target.value)} required /> Male</label>
                            <label className='flex text-gray-400 gap-2'><input type='radio' name='gender' value='Female' onChange={(e) => setgender(e.target.value)} /> Female</label>
                            <label className='flex text-gray-400 gap-2'><input type='radio' name='gender' value='Other' onChange={(e) => setgender(e.target.value)} /> Other</label>
                        </div>
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-2'>Donation Type:</label>
                        <div className='flex gap-6'>
                            <label className='flex text-gray-400 items-center gap-2'><input type='radio' name='donationType' value='Money' onChange={(e) => setdonortype(e.target.value)} required /> Money</label>
                            <label className='flex text-gray-400 items-center gap-2'><input type='radio' name='donationType' value='Organ' onChange={(e) => setdonortype(e.target.value)} /> Organ</label>
                        </div>
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-1'>Organ Name:</label>
                        <input value={organ} onChange={(e) => setorgan(e.target.value)} className='border border-gray-300 rounded-lg p-2 w-full' type='text' placeholder='Enter organ name (if applicable)' />
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-1'>UPI Id:</label>
                        <input value={upiid} onChange={(e) => setupiid(e.target.value)} className='border border-gray-300 rounded-lg p-2 w-full' type='text' placeholder='Enter Your UPI Id' />
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-1'>Upload Photos:</label>
                        <input onChange={(e) => setimage(e.target.files[0])} className='border border-gray-300 rounded-lg p-2 w-full' type='file' accept="image/*" />
                    </div>
                    <div>
                        <label className='text-gray-800 block mb-1'>Description:</label>
                        <textarea value={description} onChange={(e) => setdescription(e.target.value)} className='border border-gray-300 rounded-lg p-3 w-full h-28' rows='4' placeholder='Write a description'></textarea>
                    </div>
                    <button type='submit' className='bg-primary text-white font-bold py-2 px-6 rounded-lg'>Submit</button>
                </form>
            </div>
        </div>
    );
};
