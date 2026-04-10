import express from 'express'
import { appointmentCancel, appointmentComplete, AppointmentsDoctor, doctorDashboard, doctorlist, doctorProfile, loginDoctor, updateprofile } from '../controllers/docController.js'
import authAdmin from '../middlewares/authadmin.js'
import authDoctor from '../middlewares/authDoctor.js'
import { updateUser } from '../controllers/UserController.js'

const doctorRouter=express.Router()
doctorRouter.get('/list',doctorlist)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,AppointmentsDoctor)
doctorRouter.post('/complete',authDoctor,appointmentComplete)
doctorRouter.post('/cancel',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update',authDoctor,updateprofile)
export default doctorRouter