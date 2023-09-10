import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/*REGISTER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            picturePath,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const savedUSer = await newUser.save();
        const token = jwt.sign({ id: savedUSer._id }, process.env.JWT_SECRET || 'secret');
        delete savedUSer.password;
        res.status(201).json({ token, user: savedUSer });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

/*LOGIN */

export const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "User does not exist!" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret');
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}