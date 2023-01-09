const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUserMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
            if (err) {
                res.status(403).json({status: "Unauthorized"});
            } else {
                const user = await User.findById(decodedToken.id);
                if(user)
                    next();
                else
                    res.status(403).json({status: "Unauthorized"});
            }
        })
    } else {
        res.status(403).json({status: "Unauthorized"});
    }
};