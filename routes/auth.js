const User = require('../modles/User');
const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SEC = 'ritik@s'
// Creating a new User (@signup)
router.post('/signup', [
    body('username', 'Invalid Username').isLength({min : 3}),
    body('email', 'Invalid Email')
    .isEmail()
    .custom(async (email) => {
        const existingUser =
            await User.findOne({ email })
             
        if (existingUser) {
            throw new Error('Email already exist')
        }
    }),
    body('password', 'Password Must contain atleast 5 Char').isLength({min : 5})
    ], async(req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors : result.array()})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try{
        User.create({
            username : req.body.username,
            email : req.body.email,
            password : secPass
        }) 
        const data  = {
            user:{
                id : User.id
            }
        }
        const authToken = jwt.sign(data, JWT_SEC)
        res.json(({authToken}))
        // .then( user => res.json(user) )
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Some Error Occured")
    }  

    // res.send({errors : result.array()})

})

//Authenticating A User (@login) 
router.post('/login',[
    body('email','Enter a Valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async(req, res) => {
    let success = false;
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(400).json({success, error: 'Please enter correct credentials to loging'})
        }

        const compPass = await bcrypt.compare(password, user.password)
        if(!compPass){
            success = false;
            return res.status(400).json({ success, error: 'Please enter correct Password to loging'})
        }

        const data  = {
            user:{
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SEC)
        success = true;
        res.json({success, authToken})

        } catch(err){
            console.log(err.message);
            res.status(500).send("Some Error Occured")
    }
})

//Get user data (@userData)

router.post('/getuser',fetchuser, async(req, res) =>{

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }
})


module.exports = router
