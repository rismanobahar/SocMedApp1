//THIS FILE IS USED FOR AUTHENTIFICATION PROCEDURE E.G LOGIN AND REGISTRATION

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => { //register function
    try{
        const {
            firsName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;  //request http body along with these property for POST method

        const salt = await bcrypt.genSalt(); //generates salt function that will add randomness and uniqueness to each hashed password. So if there are two same password from 2 different user, their hashed passwords will be different.
        const passwordHash = await bcrypt.hash(password, salt); //hash the password(encrypt or secure it)

        const newUser = new User({
            firsName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        }); //create new data in these property for registration
        const savedUser = await newUser.save(); //save the new data(registered)
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => { //login function
    try{
        const { email, password } = req.body; //request http body along with these property for POST method
        const user = await User.findOne({ email: email }); //wait untill the selected user found
        if (!user) return res.status(400).json({ msg: "User does not exist. "});//if user not found: error

        const isMatch = await bcrypt.compare(password, user.password);//compare the inserted password with the saved password using bcrypt library
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});//if password not found: error

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);//generate a jwt that containing user id, password, and JWT_SECRET stored in ENV file
        delete user.password;//after successfully logging in, jwt will delete the password input to minimize the exposure of sensitive information
        res.status(200).json({ token, user });
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
}