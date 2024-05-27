import express from 'express';
import authMiddleware from '../middleware.js';
import { Account } from '../db.js';
 const router = express.Router();

 router.get('/balance',authMiddleware,async(req,res) => {
    const account =await  Account.findOne({
        userId:req.userId
    })
    res.send({
        balance:account.balance
    })
 })

 router.post('/transfer',authMiddleware, async(req, res) => {
   try {
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    });
    console.log(req.userId);

    if (!account) {
        return res.status(400).json({
            message: "User account not found"
        });
    }

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