import jwt from "jsonwebtoken";
import config from './config.js'
// import dotenv from 'dotenv'

// dotenv.config();

// console.log(config.JWT_SECRET)

const getToken = (subject) => {
    return jwt.sign(
        {
            id: subject.id,
            name: subject.name,
            email: subject.email,
            isAdmin: subject.isAdmin
        }
        ,
        config.JWT_SECRET
        ,
        {
            expiresIn: '36h'
        }
    )
}

const isAuth = (req, res, next) => {
    console.log(req.headers.authorization)
    const rawToken = req.headers.authorization;
    if(rawToken) {
        const token = rawToken.slice(7, rawToken.length);
        jwt.verify(token, config.JWT_SECRET, (error, decode) => {
            if (error)
                return res.status(401).send({message: 'Invalid Token'});
            req.user = decode;
            next();
            return;
        })
    } else {
        return res.status(401).send({message: 'Token Not Found'})
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
      console.log('I am here:  Success')
        return next();
    }
    console.log('I am here')
    return res.status(401).send({message: 'You are not an Admin'})
}

export { getToken, isAuth, isAdmin }