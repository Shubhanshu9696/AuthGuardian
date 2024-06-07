const { response } = require('express');

const jwt = require('jsonwebtoken');

require('dotenv').config();
exports.auth = (req, res, next) =>{

    try {
        //there are three method for fetching token . ie, from request.body, from header , and from cookie, 
        // we will learn remaing method later that how can we extract token from cookie and header

        // console.log('cookies',req.cookies.token);
        // console.log('request body', req.body.token);
        // console.log('request header', req.header("Authorization"));

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        // const token = req.body.token;
        console.log(token);

        if(!token){
            return response.status(401).json({
                success : false,
                message : ' token missing'
            })
        }

        try {

            const payload = jwt.verify(token , process.env.JWT_SECRET);

            console.log("this is payload which we decrypted",payload);
            
            req.user = payload;
            
        } catch (error) {
            return res.status(401).json({
                success : false,
                message: 'token invalid'
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success : false,
            message : 'something went wrong while verifying token'
        })
    }
}



exports.isStudent = (req, res, next) =>{

    try {
        if(req.user.role != "Student"){
            return res.status(401).json({
                success : false, 
                message : 'this is protected route for student'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'user role is not matching'
        })
    }
}


exports.isAdmin = (req, res, next) =>{

    try {
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success : false, 
                message : 'this is protected route for admin'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'user role is not matching'
        })
    }
}


