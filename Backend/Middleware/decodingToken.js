const jwt = require('jsonwebtoken');
const jwtKey = "thisisout$oken";
const decodingToken = (req , res , next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Session expired"})
    }
    try {
        let data = jwt.verify(token , jwtKey );
        req.user = data.user;
        next();
        
    } catch (error) {
        
        res.status(401).send({error:"Session expired"})
    }
}
module.exports = decodingToken;