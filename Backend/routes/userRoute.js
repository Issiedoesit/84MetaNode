const dotenv = require("dotenv").config()
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Users = require("../models/usersModel")

const router = express.Router()

const generateAccessToken = (email) => {
    return jwt.sign(email, process.env.TOKEN_SECRET);
}

router.get("/", async (req, res)=>{
    const allUsers = await Users.find().sort({
        createdAt: 'desc'
    })
    try{
        res.status(200).json({status:200, message:"Fetched all users successfully", users: allUsers})
    }catch (err){
        res.status(500).json({status:500, message:"Something went wrong"})
    }
})

router.get("/:id", async (req, res)=>{
    const user = await Users.findById(req.params.id)
    try{
        const {createdAt, dob, updatedAt, firstname, lastname, username, email:userEmail, id:_id  } = user
        res.status(200).json({status:200, message:"Fetched user successfully", user:[{id:_id, username, email:userEmail, firstname, lastname, createdAt, dob, updatedAt}]})
    }catch (err){
        res.status(500).json({status:500, message:"Something went wrong"})
    }
})

router.post("/signup", getUserExists,  async (req, res) => {

    const {username, password, email, firstname, lastname, dob} = req.body

    const saltRounds = parseInt(process.env.SALT_ROUNDS)

    let encryptedPassword = await bcrypt.hash(password, saltRounds)
    // console.log(res.user);
    
    try{
        if (!username || !password || !email || !firstname || !lastname){
            throw new Error("Missing fields!")
        }
        const user = await Users.create({
            username,
            email: email.toLowerCase(),
            firstname,
            lastname,
            dob,
            password: encryptedPassword
        })
        // console.log(user);
        res.status(201).json({status:201, message:"User Created Successfully"})
    }catch(error){
        res.status(400).json({status:400, message: "Invalid Credentials"})
    }

    
})


router.post("/login", async (req, res) => {

    const {email, password} = req.body

    const user = await Users.findOne({email: email.toLowerCase()})

    const token = generateAccessToken(email)
    // console.log(token);

    const updatedUser = await Users.findByIdAndUpdate(
        user.id,
        { lastLogin: Date.now() },
        { new: true }
    );
    

    try{

        if (!user){
            res.status(200).json({status:404, message: "Account not found"})
        }else{
            let decryptedPassword = await bcrypt.compare(password, user.password)
            if(decryptedPassword){
                const {createdAt, dob, updatedAt, firstname, lastname, username, email:userEmail, id:_id, lastLogin  } = updatedUser
                res.status(200).json({status:200, message:"User logged in Successfully", token:token, user:[{id:_id, username, email:userEmail, firstname, lastname, createdAt, dob, updatedAt, lastLogin}]})
            }else{
                res.status(200).json({status:400, message: "Invalid Credentials"})
            }
        }

    }catch(error){
        res.status(400).json({status:400, message: "Invalid Credentials"})
    }
    
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        res.status(200).json({message: "Successfully updated user", user : updatedUser})
    }catch{
        res.status(404).json({message: "Something went wrong"});
    }
})

router.delete("/:id", async (req, res)=>{
    const user = await Users.findByIdAndRemove(req.params.id)
    try{
        res.status(200).json({status:200, message:"Deleted user successfully", user: user})
    }catch (err){
        res.status(500).json({status:500, message:"Something went wrong"})
    }
})

async function getUserExists (req, res, next){
    let user
    try {
        user = await Users.findOne({email : req.body.email.toLowerCase()})
        if(user){
            return res.status(200).json({status:404, message:'Account already exists'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

module.exports = router