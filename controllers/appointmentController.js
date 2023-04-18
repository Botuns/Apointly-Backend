const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
//create
const createAppointment = async (req, res) => {
  try {
    const { name, date, time, reason,user } = req.body;

    const UserId = await User.findById(user);
    console.log(`This is the user id: ${user}`)

    if (!UserId) {
      return res.status(401).json({ message: 'User not found' });
    }

    const appointment = new Appointment({
      name,
      date,
      time,
      reason,
      user,
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
//getall-user
const getUserAppointments = async (req, res,user) => {
  try {
    const userId = await User.findById(user);

    if (!userId) {
      return res.status(401).json({ message: 'User not found' });
    }

    const appointments = await Appointment.find({ user: user._id }).sort('-createdAt');

    res.json({ appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//allapointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('user', '-password');
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


//update
const updateAppointment = async (req, res,id) => {
  try {
    // const { id } = req.params;

    //const { appointmentId } = req.params;

     const appointment = Appointment.findOne({user :id })
    //const appointment = await Appointment.findById(id);
      console.log(appointment)
      // console.log(appointmentId)

    if (appointment==null) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    

    appointment.approved = "true";

    await appointment.updateOne({approved:"true"})

    res.json({ message: 'Appointment approved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
//delete
const deleteAppointment = async (req, res,id) => {
  try {
    const { appointmentId } = req.params;

    //await Appointment.findById(id);
    const Cid = String(id)
    const appointment = Appointment.findOne({user :Cid })
    console.log(appointment)
      console.log(appointmentId,Cid)

    if (appointment==null) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    

    await appointment.deleteOne();

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
 createAppointment,
 deleteAppointment,
 getAllAppointments,
 updateAppointment,
 getUserAppointments
};