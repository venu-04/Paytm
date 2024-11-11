import express from 'express';
import authMiddleware from '../middleware.js';
import { Account } from '../db.js';
import bcrypt from 'bcryptjs';
 const router = express.Router();

 router.get('/balance',authMiddleware,async(req,res) => {
    const account =await  Account.findOne({
        userId:req.userId
    })
    
    
    if(!account){
        return res.status(404).json({message:"Account not found"});
    }
    res.send({
        balance:account.balance
    })
 })

 router.post('/transfer',authMiddleware, async(req, res) => {
   try {
    const { amount, to ,password} = req.body;
    console.log(req.body);///////terminal lo chudu
    const account = await Account.findOne({
        userId: req.userId
    });
    console.log(req.userId);
    console.log(req);
    
    

    if (!account) {
        return res.status(400).json({
            message: "User account not found"
        });
    }
    // const isPassword=await bcrypt.compare(password,account.password);
    // console.log(isPassword);
    // console.log(account.password);
    
    
    // if(!isPassword){
    //     return res.status(400).json({message:"Invalid password"})
    // }

    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })


    res.json({
        message: "Transfer successful"
    })

   } catch (error) {
     console.error("Error in transferring error",error);
     res.status(500).json({message:"Internal server error"});
   }
});

//  module.exports=router;
export default router;