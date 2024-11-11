import express from 'express';
import userroute from './user.js';
import  accountrouter from './accounts.js';
const router = express.Router()
router.use('/user', userroute);
router.use('/account',accountrouter);



// module.exports= router;
export default router;