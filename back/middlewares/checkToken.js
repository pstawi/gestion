import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// utilisation de dotenv
dotenv.config();

const checkToken = (req, res, next) => {


    const token = req.headers['authorization'].split(" ")[1];

    console.log("token middleware :", token);

    if(!token){
        return res.status(401).json({message: "token manquant"});
    }

    try {

        const decodeToken = jwt.verify(token, process.env.SECRET);
        req.user = decodeToken;
        next();
        
    } catch (error) {
        return res.status(403).json({message : "token invalide"});
    }
};

export default checkToken;