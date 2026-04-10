import doctorModel from "../model/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AppointmentModel from "../model/AppointmentModel.js"
const changeavailability=async(req,res)=>{
    try {
        const {docId}=req.body
        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:'Avaialibility Change'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const doctorlist=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select(['-password','-email' ])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}
// API for docttor login
const loginDoctor=async(req,res)=>{
    try {
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'Invalid Credentials'})
        }
        const isMatch=await bcrypt.compare(password, doctor.password)
        if(isMatch){
            const token= jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}
// API for doctor appointment
const AppointmentsDoctor=async(req,res)=>{
    try {
      const {docId}=req.body   
      const appointments=await AppointmentModel.find({docId})
      res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// API
const appointmentComplete=async(req,res)=>{
    try {
         const {docId,appointmentId}=req.body
         const appointmentData=await AppointmentModel.findById(appointmentId)
         if(appointmentData && appointmentData.docId===docId){
            await AppointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:'Appointment Completed'})
         } else{
            return res.json({success:false,message:'Mark Failed..'})
         }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// API To cancel appointment
const appointmentCancel=async(req,res)=>{
    try {
         const {docId,appointmentId}=req.body
         const appointmentData=await AppointmentModel.findById(appointmentId)
         if(appointmentData && appointmentData.docId===docId){
            await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:'Appointment Cancelled'})
         } else{
            return res.json({success:false,message:'Cancelled Failed..'})
         }
         
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// API to get dashboard data for doctor panel
const doctorDashboard=async(req,res)=>{
    try {
        const {docId}=req.body
        const appointments=await AppointmentModel.find({docId})
         let earnings=0;
         appointments.map((item)=>{
            if(item.isCompleted || item.payment){
               earnings+=item.amount
            }
         })
         let patients=[]
         appointments.map((item)=>{
            if(!patients.includes(item.userId)){
    patients.push(item.userId)
            }
         })
         const dashData={
            earnings,
            appointments:appointments.length,
           patients:patients.length,
           latestAppointments:appointments.reverse().slice(0,5)
         }
         res.json({success:true,dashData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}
// API to get doctor profile to doctor panel
const doctorProfile=async(req,res)=>{
    try {
       const {docId}=req.body
       const profileData=await doctorModel.findById(docId).select('-password')
       res.json({success:true,profileData}) 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// update doctor profile
const updateprofile=async(req,res)=>{
    try {
      const {docId,fee,address,available} =req.body
       await doctorModel.findByIdAndUpdate(docId,{fee,address,available})
       res.json({success:true,message:'Profile Updated'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export {doctorlist,changeavailability,loginDoctor,AppointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard,updateprofile,doctorProfile};