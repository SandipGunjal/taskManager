const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log('Token -->' ,token);
  
  
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded---->' , decoded);
    
    
    // Fetch the user by ID (excluding the password)
    const user = await User.findById(decoded.id).select("-password");
    console.log("user-->" , user);
    
    // If no user is found, respond with an error
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    console.log("successfully");
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log('error' , error);
    
    res.status(401).json({ message: "Token is not valid", error: error.message });
  }
};

module.exports = authMiddleware;



// const jwt = require("jsonwebtoken");
// const User = require("../Model/userModel");
// require('dotenv').config()


// const authMiddleware = async (req, res, next) => {
  
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   console.log('Token',token);
  
//   if (!token)
//     return res.status(401).json({ message: "No token, authorization denied" });

//   try {
//     console.log('Token:', token , process.env.JWT_SECRET); // Log the token
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded JWT:', decoded); // Log the decoded payload
//     req.user = await User.findById(decoded.id).select("-password");
    
//     next();
//   } catch (error) {
//     console.error('JWT Error:', error.message); // Log the exact error message
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = authMiddleware;
