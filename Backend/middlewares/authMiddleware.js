const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.authUser = async (req,res,next) => {//we are checking if the user is login or not
    //token is present in two places 1.>cookie  2.>header authorization(we have to split the header.authorization to get header)
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization?.split(' ')[1]);
    if(!token)
    {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    //if token is found then we have to decode it.
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //it gives us the token which only have _id because we created that token with _id only.
        const user = await userModel.findById(decoded._id);//we find the user using that id

        //set this user in request.user as we are accessing the user (get request)
        req.user = user;

        return next(); 

    } catch (error) {
        return res.status(401).json({message: "Unauthorized user"})
    }
}