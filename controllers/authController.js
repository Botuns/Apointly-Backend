const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    //const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      "secret",
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User created successfully', userId: newUser._id, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "secret",
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', userId: user._id, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret");
    req.userData = { userId: decodedToken.userId, username: decodedToken.username };
    console.log(req.userData)
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports = {
  signup,
  login,
  verifyToken
};