//THIS FILE IS MADE FOR VERIFICATION

import jwt from 'jsonwebtoken'; 

export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization"); //request Authorization header

        if (!token) {
            return res.status(403).send("Access Denied"); //if there is no token, will be denied
        }

        if (token.startsWith("Bearer ")){ //all token will be start wiht Bearer
            token = token.slice(7, token.length).trimLeft(); //if so, this will additionally add the token right after Bearer and only take the 7 character token with slice
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); //define verification variable with jwt.verify, alson consisted token and JWT_SECRET that has been made in ENV file
        req.user = verified; //request user to be verified
        next(); //pass on to next handler
            
    } catch (err) {
        res.status(500).json({ error: err.message }); //error
    }
}