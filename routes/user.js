const express = require('express');

const router = express.Router();

const{login, signup} = require('../controller/auth');

const {auth, isStudent, isAdmin} = require('../middlewares/Auth');

router.post('/login', login);
router.post('/signup', signup);

router.get('/test', auth , (req , res)=>{
    res.status(200).json({
        success : true , 
        message : 'welcome to authentication test'
    })
})

router.get('/student', auth , isStudent, (req , res)=>{
    res.status(200).json({
        success : true , 
        message : 'welcome to isStudent test'
    })
})

router.get('/admin', auth, isAdmin, (req, res)=>{
    res.status(200).json({
        success : true , 
        message : 'welcome to isAdmin test'
    })
})

module.exports = router;