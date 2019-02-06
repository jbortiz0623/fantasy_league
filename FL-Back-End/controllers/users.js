const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const db = require('../models');
const passport = require('../config/passport')
const config = require('../config/config')



// verfify the token
function verifyToken(token) {
    let decoded = {}
    jwt.verify(token, config.jwtSecret, function(err,verified) {
        if (err) {
            decoded= {"message": err.message}
        } else {
            decoded = verified
        }
    })
    return decoded
}


//routes & controllers
router.post('/signup', (req, res) => {
    console.log(req.body)
    if (!(req.body.name && req.body.username && req.body.email && req.body.password)) {
        return res.status(400).json({
            error: "data cannot be empty"
        })
    }
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if (err) {
            return res.status(500).json({
                error: "bad password"
            })
        } 
        
        // new user
        let newUser = {
            email: req.body.email, 
            password: hash,
            username: req.body.username,
            name: req.body.name,
        }
        console.log(`Checking new user object: ${newUser.password}`);
        //save to the database
        db.User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    error: "email does exists in db"
                })
            }
            db.User.create(newUser)
            .then(user => {
                console.log(`Creating new user: ${newUser.password}`)
                if (user) {
                    let payload = { id: user.id }
                    let token = jwt.sign(payload,config.jwtSecret,{
                        expiresIn:  "24h"
                    })
                    // console.log(`JSON Web Token: ${token}`)
                    return res.json({ 'token':token, user })
                } else {
                    return res.status(404).json({
                        error: "bad token"
                    })
                }
            })
        })
    })
})



router.post('/login',(req,res)=>{
    // /*
    //     Check for the body, prior to coding
    //     Next use destructuring to grab the appropriate params
    // */
    // console.log(req.body);
    let { email, password } = req.body;
    
    // if (req.body.email && req.body.password) {
    //     return res.status(400).json({
    //         error: "data field cannot be empty"
    //     })
    // }

    db.User.findOne({ email: email })
    .then(user => {
        console.log(user);
        // Check the user object in the terminal
        console.log(`Password check: ${user.password}`);

        if (!user) {
            return res.status(404).json({
                error: "invalid email"
            })
        }
        bcrypt.compare(password, user.password, (err, match)=>{
            if (err) {
                return res.status(500).json({
                    error: "retry password"
                })
            }
            if (match) {
                let payload = { id: user.id }
                let token = jwt.sign(payload,config.jwtSecret,{
                    expiresIn:  "12h"
                })
                return res.json({ 'token': token, user })
            } else {
                return res.status(401).json({
                    error: "email/password are invalid"
                })
            } 
        })
    })
})



router.post('/profile',(req,res)=>{
    // console.log("header: ",req.headers.authorization!==undefined)
    
    // if (req.headers.authorization===undefined) {
    //     return res.status(403).json({
    //         error: "403"
    //     })
    // }

    let token = req.body.token
    let decoded = verifyToken(token)
    

    if (decoded.id===undefined) { 
       
        return res.status(403).json({"message":"invaid query"}) 
    }
    console.log(decoded.iat,decoded.exp)
        
    // find user by id
    db.User.findById(decoded.id)
    .then(user=>{

        if (!user) {
            return res.status(401).json({
                error: "user not found"
            })
        }
        // save results to object
        let obj = {
            "username": user.username,
            "email": user.email,
            "Name": user.name
        }
        res.json(obj)
        // find teams that are associated with user_id 
        // db.Team.find({author: decoded.id})
        // .then(teams=>{
        //     //console.log(teams)
        //     let resTeams = []
        //     teams.map(team=>{
        //         resTeams.push({
        //             "TName": team.TName,
        //             "body": team.body,
        //             "coach": obj.username,
                    
        //         })
        //     })
        //     obj.teams = resteams
        //     return res.json(obj)
        // })
    })  
})

router.get('/:id/teams', (req,res)=>{
    let id = req.params.id
    db.Team.find({'Coach':id})
        .populate('players')
        .exec((err,found) => res.json(found))
})


//patch
router.patch("/profile/:id",(req,res)=> {
   
    // if (req.headers.authorization===undefined) {
    //     return res.status(403).json({
    //         error: "forbidden"
    //     })
    // }
   
    // let token = req.headers.authorization.split(" ")[1]
    // let decoded = verifyToken(token)
    
    // if (decoded.id===undefined) { 
    //     console.log(decoded)
    //     decoded.error= 401
    //     return res.status(401).json(decoded) 
    // }
    console.log(req.params.id, req.body);
    
    db.User.findOneAndUpdate(
        {'_id': req.params.id},
        {'$set': req.body },
        {upsert: false},
    ).then((user)=>{
        if (!user) {
            return res.status(401).json({
                error: "user not found"
            })
        }
        return res.json({
            message: "updated",
            body: req.body,
        })
    })
    .catch(err=>{
        return res.status(500).json({
            error: "DB error" 
        })
    })
})


module.exports = router