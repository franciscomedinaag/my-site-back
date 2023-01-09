const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 1*24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    let errors = {email:"", password:""};

    if (err.message === "Incorrect Email")
        errors.email = "The email is not registered"

    if (err.message === "Incorrect Password")
        errors.email = "The password is incorrect"

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if(err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports.register = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.create({email, password});
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        });
        res.status(201).json({user:user._id, created:true})
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created : false});
    }
};

module.exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        });
        res.status(200).json({user:user._id, created:true})
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created : false});
    }
};

module.exports.checkIfUserIsAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
            if (err) {
                res.json({status: false});
            } else {
                const user = await UserModel.findById(decodedToken.id);
                if(user)
                    res.json({status:true, user: user.email});
                else
                    res.json({status:false});
            }
        })
    } else {
        res.json({status:false});
    }
};

module.exports.secretInfo = async (req, res, next) => {
    res.status(200).json({info:"the secret is luv <3"})
};