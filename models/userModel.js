const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});

const User = mongoose.model('User', userSchema);
module.exports=User
