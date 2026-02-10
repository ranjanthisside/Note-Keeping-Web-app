import jwt from "jsonwebtoken";


const authMiddleware = (req,res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader){
            return res.status(401).json({message: "no Token provided"});
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify (token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch (error){
        return res.status(401).json({message: "Invalid Token"});
    }
};

export default authMiddleware;