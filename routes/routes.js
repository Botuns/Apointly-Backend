const express = require('express');
const router = express.Router();
const { signup,login,verifyToken } = require('../controllers/authController');
const { createAppointment,deleteAppointment,updateAppointment,getUserAppointments,getAllAppointments } = require('../controllers/appointmentController');

router.post('/signup', signup);
router.post('/login', login);

router.post('/appointment/create',createAppointment);

// 
router.get('/appointment/user/:id',getUserAppointments);

router.put('/appointment/:id',updateAppointment);

router.delete('/appointment/deny/:id',deleteAppointment);

router.get('/appointments',getAllAppointments);
// router.use(authMiddleware);


module.exports = router;
