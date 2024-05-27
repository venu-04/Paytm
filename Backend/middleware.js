import jwt from 'jsonwebtoken';
import JWT_SECRET from './config.js';

const authMiddleware = (req, res, next) => {
    const authHeader =req.headers.authorization;//it returns the value of the authentication header sarting with Bearer and space(' ') and jwt token
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({message: "Unauthorized"});
    }
    const token = authHeader.split(' ')[1];//it splits the value into an array and returns the second element(1st index) which is generally a token
    try {
        const decoded = jwt.verify(token,JWT_SECRET) // it returns the payload which contain details of the user such as userID,username etc..
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid token" });
    }
}
export default authMiddleware;
