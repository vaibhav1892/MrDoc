import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DoctorsPage from './pages/DoctorsPage';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointment from './pages/MyAppointment';
import Appointment from './pages/Appointment';
import LayoutPage from './pages/LayoutPage';
import Navbar from './components/Navbar';
import FooterPage from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DonationPage } from './pages/Donation';
import { DonationPersonal } from './pages/DonationPersonal';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/doctors' element={<DoctorsPage />} />
        <Route path='/donation' element={<DonationPage />} />
        <Route path='/donate/:donationId' element={<DonationPersonal />} />
        <Route path='/doctors/:speciality' element={<DoctorsPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      
      </Routes>
      <FooterPage/>
    </div>
  );
};

export default App;
