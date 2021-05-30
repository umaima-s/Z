const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys')
const router = express.Router();
const Calc = mongoose.model('Calc');


router.post('/history', async (req, res) => {

    console.log(req.body)
    const { gold, silver, cash_in_hand, cash_in_bank, loans, property, business_assets, total, zak } = req.body;

    try {
        const calc = new Calc({ gold, silver, cash_in_hand, cash_in_bank, loans, property, business_assets, total, zak });
        await calc.save();
        const token = jwt.sign({ userId: calc._id }, jwtkey)
        // res.send({ token })
        res.send(calc);

    }
    catch (err) {
        return res.status(422).send(err.message)
    }


})

// router.post('/signin',async (req,res)=>{
//     const {email,password} = req.body
//     if(!email || !password){
//         return res.status(422).send({error :"must provide email or password"})
//     }
//     const user = await User.findOne({email})
//     if(!user){
//         return res.status(422).send({error :"must provide email or password"})
//     }
//     try{
//       await user.comparePassword(password);    
//       const token = jwt.sign({userId:user._id},jwtkey)
//       res.send({token})
//     }catch(err){
//         return res.status(422).send({error :"must provide email or password"})
//     }



// })


module.exports = router