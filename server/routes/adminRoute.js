import express from 'express'
import { addDoctor,admindashboard,allDoctors,appointmentAdmin,cancelAppointmentAdmin,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authadmin.js'
import { changeavailability } from '../controllers/docController.js'
import { cancelAppointment } from '../controllers/UserController.js'

const adminRouter=express.Router()
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login' ,loginAdmin)
adminRouter.post('/all-doctor',authAdmin ,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeavailability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/admincancel',authAdmin,cancelAppointmentAdmin)
adminRouter.get('/dashboard',authAdmin,admindashboard)
export default adminRouter
