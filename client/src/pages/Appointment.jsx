import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendurl, token, getDoctorsData } = useContext(AppContext);
  const daysofweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setdocInfo] = useState(null);
  const [docslot, setdocslot] = useState([]);
  const [slotindex, setslotsindex] = useState(0);
  const [slotTime, setslotTime] = useState('');
  const navigate = useNavigate()
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setdocInfo(docInfo)

  }
  const getavailableslot = async () => {
    setdocslot([])
    // getting current date
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let cuurrentdate = new Date(today);
      cuurrentdate.setDate(today.getDate() + i)
      // setting end time of the date with index
      let endtime = new Date();
      endtime.setDate(today.getDate() + i)
      endtime.setHours(21, 0, 0, 0)
      // setting hours
      if (today.getDate() === cuurrentdate.getDate()) {
        cuurrentdate.setHours(cuurrentdate.getHours() > 10 ? cuurrentdate.getHours() + 1 : 10)
        cuurrentdate.setMinutes(cuurrentdate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        cuurrentdate.setHours(10)
        cuurrentdate.setMinutes(0)
      }
      let timeslot = []
      while (cuurrentdate < endtime) {
        let formattedTime = cuurrentdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        // add slot to array
        let day= cuurrentdate.getDate()
        let month=cuurrentdate.getMonth()+1
        let year=cuurrentdate.getFullYear()
       
        const slotDate=day+"_"+month+"_"+year
        const slotTime=formattedTime
        const isSlotAvailable=docInfo.slot_booked[slotDate] && docInfo.slot_booked[slotDate].includes(slotTime) ? false : true
         if(isSlotAvailable){
        timeslot.push({
          datetime: new Date(cuurrentdate),
          time: formattedTime
        })
      }
        // Increament current time by 30 min
        cuurrentdate.setMinutes(cuurrentdate.getMinutes() + 30)
      }
      setdocslot(prev => ([...prev, timeslot]))
    }
  }
  const BookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    else {
      try {
        const date = docslot[slotindex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        const { data } = await axios.post(backendurl + '/apiback/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
        if (data.success) {
          toast.success(data.message);
          getDoctorsData()
          navigate('/my-appointment')
        }
        else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }
  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getavailableslot()
  }, [docInfo])

  useEffect(() => {
    console.log(docslot);
  }, [docslot])

  return docInfo && (
    <div>
      {/* ---Doctors Details */}
      <div className='flex flex-col sm:flex-row gap-5'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg ' src={docInfo.image} alt='' />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt='' />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About
              <img src={assets.info_icon} alt='' />
            </p>
            <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>{docInfo.about}</p>
          </div>
          <p className='mt-4 flex gap-2 text-gray-500 font-medium  '>Appointment Fee:<span className='text-gray-600'>{currencySymbol}{docInfo.fee}</span></p>
        </div>
      </div>
      {/* ------Booking slots---- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
          {docslot.length > 0 && docslot.map((item, index) =>
          (
            <div onClick={() => setslotsindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex === index ? 'bg-primary text-white' : 'border border-gray-200'} `} key={index}>
              <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          )
          )}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docslot.length && docslot[slotindex].map((item, index) => (
            <p onClick={() => setslotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'} `} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={BookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6   '>Book an appointment</button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment