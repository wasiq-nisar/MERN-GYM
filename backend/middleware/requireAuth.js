const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireAuth = async (req,res,next) => {
    //Verify Authentication
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: 'Authoriztion token required'});
    }

    const token = authorization.split(' ')[1];
    //authorization is of the form 'bearer asdf.asd.asd'. So, we are splitting it on white space and getting the second element which is the jwt. 

    try {
        //Grabbing _id from token
        const {_id} = jwt.verify(token, process.env.SECRET);
        
        //We Appending a user property with our req object. We find the required by _id and to add that document to user we use select
        req.user = await User.findOne({_id}).select('_id');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
}

module.exports = requireAuth;