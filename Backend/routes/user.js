import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import JWT_SECRET  from '../config.js';
import  {User} from '../db.js';
import {Account} from '../db.js';
import authMiddleware from '../middleware.js';
const router = express.Router();  



router.get('/signup',(req,res) => {
    res.send("signup page");
})

router.use(express.json());

const signupBody = zod.object({
    username: zod.string().email(), 
    firstName: zod.string(), 
    lastName: zod.string(),
    password: zod.string()
});

router.post('/signup',async (req,res) => {
    console.log(req.body);
    const {success} = signupBody.safeParse(req.body);
    console.log(success);
    if(!success) {
       return res.status(411).json({
        message:"Email already taken/Incorrect inputs"
       })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"Email has already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password

    })
    const userId = user._id;

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);
    
    res.json({
        message:"user created successfully",
        token:token
    })

})

const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post('/signin', async (req,res) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })

    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message:"error while logging in"
    })
})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
router.put('/',authMiddleware,async(req,res) => { // here  authMiddleware is used to allow only authorized users to update
    const success = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"error while updating the user"
        })
    }
     await User.updateOne({_id: req.user.Id},req.body);//updating the user with userId to req.body which is new data given by client

     res.json({
        message:"updated successfully"
     })
})

router.get('/bulk',async(req,res) => { //this is the route to get users from the backend through firstname and lastname
    // In Express.js, query parameters are typically provided in the URL after a question mark (?) and separated by ampersands (&).
    // For example, in the URL http://example.com/search?q=query&filter=type,
    // the query object would be { q: 'query', filter: 'type' }.
    const filter = req.query.filter || "";


    const users = await User.find({
        $or:[{  //this is logical     OR operation that either firstname or lastname contains our query
            firstName:{$regex:filter},  //$regex is a mongodb operator that allows us to search for a pattern in a string
            lastName:{$regex:filter}    //i.e if we search for "a" it will return all the users whose firstname or lastname contains "a"
                                         //a is inplace of filter
        }]
    })
    console.log(users);

   res.json({
        user:users.map(user =>({
            firstName:user.firstName,
            lastName:user.lastName,
            userId:user._id
        }))
    })


})

export default router;