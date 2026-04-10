import validator from "validator";
import bycrpt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../model/doctorModel.js";
import jwt from 'jsonwebtoken'
import AppointmentModel from "../model/AppointmentModel.js";
import UserModel from "../model/UserModel.js";
//API for add doctor
const addDoctor=async(req,res)=>{
    try {
       const {name,email,password,speciality,degree,experience,about,fee,address}=req.body;
       const imageFile=req.file
       // checking  for all data to add doctor
       if(!name || !email || !password || !speciality  || !degree || !experience || !about || !fee || !address ){
        return res.json({success:false,message:"Missing detail"})
       }
       // validating email format
       if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter the valid email"})
       }
       // validating strong password
       if(password.length<3){
        return res.json({success:false,message:"Please enter valid password."})
       }
     // hashing doctor password
     const salt=await bycrpt.genSalt(10)
     const hashedpassword=await bycrpt.hash(password,salt)
     // upload image to cloudinary
     const imageupload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });
    
     const imageUrl= imageupload.secure_url
     const doctordata={
        name,
        email,
        image:imageUrl,
        password:hashedpassword,
        speciality,
        degree,
        experience,
        about,
        fee,
        address:JSON.parse(address),
        date:Date.now()
     }
     const newdoctor=new doctorModel(doctordata)
     await newdoctor.save()
     res.json({success:true,message:"Doctor added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API for admin login
const loginAdmin=async(req,res)=>{
   
    try{
       
      const {email,password}=req.body
      console.log(email);
      console.log(password);
      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       const token=jwt.sign(email+password,process.env.JWT_SECRET)
       res.json({success:true,token})
      } 
      else{
        console.log('email');
        console.log('password');
        res.json({success:false,message:"Invalid Credentials"})
      }
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get all doctors list for the admin panel
const allDoctors=async(req,res)=>{
  try {
    const doctors=await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}
//API to get all appointment list
const appointmentAdmin = async (req, res) => {
  try {
      const appointments = await AppointmentModel.find(); // Fetch data
      // Ensure only raw data is sent
      res.json(appointments.map(appointment => appointment.toJSON()));
  } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
const cancelAppointmentAdmin = async (req, res) => {
  try {
      const { appointmentId } = req.body;

      // Fetch appointment data
      const appointmentData = await AppointmentModel.findById(appointmentId);
      if (!appointmentData) {
          return res.json({ success: false, message: 'Appointment not found' });
      }

      // Verify the user ID matches
      

      // Update appointment as cancelled
      await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

      // Release doctor slot
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      if (!doctorData) {
          return res.json({ success: false, message: 'Doctor not found' });
      }

      let slot_booked = doctorData.slot_booked;

      // Check if the slot date exists and remove the slot time
      if (slot_booked[slotDate]) {
          slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime);
      }
      // Update doctor data
      await doctorModel.findByIdAndUpdate(docId, { slot_booked });

      res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};
// for dashboard
const admindashboard=async(req,res)=>{
  try {
     const doctor=await doctorModel.find({})
     const users=await UserModel.find({})
     const appointments=await AppointmentModel.find({})

     const dashBoard={
      doctors: doctor.length,
      appointments:appointments.length,
      patients:users.length,
      latestAppointments:appointments.reverse().slice(0,5)

     }
     res.json({success:true,dashBoard})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export {addDoctor,loginAdmin,allDoctors,appointmentAdmin,cancelAppointmentAdmin,admindashboard }