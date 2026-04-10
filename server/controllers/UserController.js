import validator from "validator"
import bcrypt from 'bcrypt'
import UserModel from "../model/UserModel.js"
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../model/doctorModel.js"
import AppointmentModel from "../model/AppointmentModel.js"
import DonationModel from "../model/DonationModel.js"
import razorpay from 'razorpay'
// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing details' })
        }
        // validating strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" })
        }
        if (password.length < 3) {
            return res.json({ success: false, message: "Enter a Strong Password." })
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)
        const userData = {
            name,
            email,
            password: hashedpassword,
        }
        const newUser = new UserModel(userData)
        const user = await newUser.save()
        // _id
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ succes: false, message: error.message })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ succes: false, message: 'User does not exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ succes: true, token })
        }
        else {
            res.json({ succes: false, message: 'Invalid Credentials' })
        }
    } catch (error) {
        console.log(error)
        res.json({ succes: false, message: error.message })
    }
}
// API to get user details
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const UserData = await UserModel.findById(userId).select('-password')
        res.json({ success: true, UserData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
const updateUser = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ succes: false, message: "Data missing" })
        }
        await UserModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if(imageFile){
            // upload image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl=imageUpload.secure_url
            await UserModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true,message:'Profile Updated'})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// API TO BOOK APPOINTMENT
const BookAppointment=async(req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime}=req.body
        const docData=await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success:false,message:"Doctor Not Available"})
        }
        let slot_booked=docData.slot_booked
        // checking for slot availability of doctor
        if(slot_booked[slotDate]){
            if(slot_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot Not Available"}) 
            }
            else{
                slot_booked[slotDate].push(slotTime)
            }
        } else{
            slot_booked[slotDate]=[]
            slot_booked[slotDate].push(slotTime)
        }
        const userData=await UserModel.findById(userId).select('-password')
        delete docData.slot_booked
        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fee,
            slotTime,
            slotDate,
            date:Date.now()
        }
        const newAppointment=new AppointmentModel(appointmentData)
        await newAppointment.save()
        // save new slotdata in doctor data
        await doctorModel.findByIdAndUpdate(docId,{slot_booked})
        res.json({success:true,message:'Your Appointment Booked..'})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// API to get user appointment
const listappointment = async (req, res) => {
    try {
        const { userId } = req.body; // Extracted from token middleware
        const appointments = await AppointmentModel.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// API To cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        // Fetch appointment data
        const appointmentData = await AppointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        // Verify the user ID matches
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

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
// API FOR PAYMENT RAZORPAY
let razorpayInstance;
try {
  razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
  });
  if (!process.env.RAZORPAY_KEY_ID) {
    console.error('RAZORPAY_KEY_ID missing in api/.env - add test keys from dashboard');
  } else {
    console.log('Razorpay initialized successfully');
  }
} catch (error) {
  console.error('Razorpay init failed:', error.message);
  razorpayInstance = null;
}
const paymentRazorpay=async(req,res)=>{
    try {
        const {appointmentId}=req.body
        const appointmentData=await AppointmentModel.findById(appointmentId)
        if(!appointmentData || appointmentData.cancelled){
          return res.json({success:false,message:'Appointment canceeled or not found'})
        }
        // create option for payment
        const option={
          amount:appointmentData.amount*100,
          currency:process.env.CURRENCY,
          receipt:appointmentId,
        }
        // creation of an order
        if (!razorpayInstance) {
          return res.json({success: false, message: 'Razorpay not configured - check server console'});
        }
        const order = await razorpayInstance.orders.create(option)
        res.json({success:true,order}) 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// API to verify payment
const verifyRazorpay = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body;
  
      // Validate request
      if (!razorpay_order_id) {
        return res.status(400).json({ success: false, message: "Order ID is required." });
      }
  
      // Fetch order details from Razorpay
      if (!razorpayInstance) {
        return res.status(500).json({ success: false, message: 'Razorpay not configured - check server console' });
      }
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
  
      if (!orderInfo) {
        return res.status(404).json({ success: false, message: "Order not found." });
      }
  
      // Check if payment is successful
      if (orderInfo.status === 'paid') {
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
          orderInfo.receipt, // Ensure `receipt` is the Appointment ID
          { payment: true },
          { new: true } // Return the updated document
        );
  
        if (!updatedAppointment) {
          return res.status(404).json({ success: false, message: "Appointment not found." });
        }
  
        return res.json({ success: true, message: "Payment Successful" });
      } else {
        return res.json({ success: false, message: "Payment not completed yet." });
      }
    } catch (error) {
      console.error("Error in verifyRazorpay:", error.message);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
const DonationReq = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, age, gender, donortype, organ, description,upiid } = req.body;
        const imageFile = req.file;
        console.log(req.body);

        // Validate required fields
        if (!firstname || !lastname || !email || !phone || !age || !gender || !donortype || !upiid) {
            return res.status(400).json({ success: false, message: "All required fields must be filled" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate age as a number
        if (isNaN(age) || age < 1) {
            return res.status(400).json({ success: false, message: "Invalid age" });
        }
        
        let imageUrl = "";
        if (imageFile) {
            // Upload image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            imageUrl = imageUpload.secure_url;
        }
        
        // Create new donation request
        const newDonation = new DonationModel({
            firstname,
            lastname,
            email,
            phone,
            age,
            gender,
            donortype,
            organ,
            image: imageUrl,
            description,
            upiid
        });

        // Save to database
        await newDonation.save();

        res.status(201).json({ success: true, message: "Donation request submitted successfully", donation: newDonation });
    } catch (error) {
        console.error("Error in DonationReq:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
const GetDonationData = async (req, res) => {
    try {
        const donations = await DonationModel.find().sort({ createdAt: -1 });
        res.json({ success: true, donations });
    } catch (error) {
        console.error("Error in GetDonationData:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
const GetPersonalDonation=async(req,res)=>{
    try {
        const { donationId } = req.body;
        const donation = await DonationModel.findById(donationId);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.json(donation);
    } catch (error) {
        console.error('Error fetching donation:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
export { registerUser, loginUser, getProfile,updateUser,BookAppointment,listappointment,cancelAppointment,paymentRazorpay,verifyRazorpay,DonationReq,GetDonationData,GetPersonalDonation }
