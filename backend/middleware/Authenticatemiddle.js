
const jwt = require('jsonwebtoken');
const {privatekey}=require('../config/config')

const authenticateToken=(req,res,next)=>{
    const tokenWithBearer =req.headers['authorization'];
    const parts = tokenWithBearer.split(' ');
    let token 

if (parts.length === 2) {
    token = parts[1];
    // console.log(token);
} else {
    console.log("Token format is incorrect.");
}
    if(!token){
        return res.status(401).json({message:"no token provided"});
    }
    jwt.verify(token,privatekey,(err,user)=>{
            if(err){
                return res.status(403).json({message:'Invalid token'});
            }
                req.user=user;
                next();
        
        });
    
};
module.exports=authenticateToken;
