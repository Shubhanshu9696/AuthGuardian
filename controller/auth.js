const User = require('../model/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config();



exports.signup = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'this user already existed'
            })
        }

        let hashedPassword;

        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'errror in hasing password'
            })
        }

        const user = await User.create({
            name, email, password: hashedPassword, role
        });
        
        // console.log(user);

        return res.status(200).json({
            success: true,
            user,
            message: 'user created successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'user signup failed , please retry '
        })
    }

}


exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'all field required'
            })
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: 'user is not registered'
            })
        }

        const payload = {
            email : existingUser.email ,
            id : existingUser.id,
            role : existingUser.role
        }

        if (await bcrypt.compare(password, existingUser.password)) {
            let token = jwt.sign(payload , process.env.JWT_SECRET, {expiresIn:"2h"} );
            
            // existingUser = existingUser.toObject();

            existingUser.token = token;

            existingUser.password = undefined;


            const options = {
                expires : new Date( Date.now() + 3*24*60*60*1000 ),
                httpOnly : true,
            };

            res.cookie("shubhCookie", token, options).status(200).json({
                success : true, 
                token, 
                existingUser, 
                message:'user logged in successfully'
            });
        }
        else {
            return res.status(404).json({
                success : false,
                message : 'password dose not matched'
            })
        } 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ' error in user login'
        })
    }
}