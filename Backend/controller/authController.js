const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
require('dotenv').config();

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "password don't match" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userDetails = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
    
    res.json({ message: "Login successfully !", token , user:userDetails});
    // console.log(token,'token login');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
