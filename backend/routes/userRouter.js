import express from 'express';
import User from '../models/userModels.js'
import { getToken } from '../util.js'

const Router = express.Router();

Router.get('/create-admin', async (req, res) => {
  console.log("create-admin")
    try {
        const newAdmin = new User({
            loginName: 'Muhammad Siddiqui',
            loginEmail: 'abc@xyz.com',
            loginPassword: '123456',
            isAdmin: true
        });

        const admin = await newAdmin.save();
        res.send(admin);
    } catch (error) {    
        res.send({message: error.message});
    }    
})

Router.post('/register', async (req, res) => {
    try {
        // console.log(req.body)
        const newUser = new User({
            loginName: req.body.name,
            loginEmail: req.body.email,
            loginPassword: req.body.password
        });
        const registerdUser = await newUser.save();
        res.send({
            user_id: registerdUser._id,
            name: registerdUser.loginName,
            email: registerdUser.loginEmail,
            isAdmin: registerdUser.isAdmin,
            token: getToken(registerdUser)
        });
        console.log(`The new User ${registerdUser}`);
        
    } catch (error) {
        console.log("registration error")    
        console.log(error.message)
        res.send({message: error.message});
    }    
})

Router.post('/login-request', async (req, res) => {
    // console.log(req.body)
    const verifiedUser = await User.findOne({
        loginEmail: req.body.email,
        loginPassword: req.body.password
    })

    console.log(verifiedUser)

    if(verifiedUser) {
        res.send({
            user_id: verifiedUser._id,
            name: verifiedUser.loginName,
            email: verifiedUser.loginEmail,
            isAdmin: verifiedUser.isAdmin,
            token: getToken(verifiedUser)
        })


    }
    else {
        console.log('Hi')
        res.status(401).send({ message: 'Unregisterd Email Or Wrong Password'})
    }
})

export default Router;
