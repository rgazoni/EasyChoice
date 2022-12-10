const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../Database/Schema/User');

const Login = async (req, res) => {

    const { username, password } = req.body;

    if(username === undefined || password === undefined)
    return {
        status: false,
        message: 'Username and password are required'
    }

    const Find = await User.find({ username: username })
    .then(response => {
        return response;
    }).catch(err => {
        return {
            status: false,
            message: err.message
        }
    });

    if(Find.length === 0){
        return {
            status: false,
            message: 'Username or password is incorrect'
        }
    }

    const match = await bcrypt.compare(password, Find[0].password).then(function(result) {
        return result;
    });

    if(!match) {
        return {
            status: false,
            message: 'Username or password is incorrect'
        }
    }

    Token = await jwt.sign({
        id: Find[0]._id,
        username: Find[0].username,
    }, process.env.JWT_SECRET);

    const oneDay = 1000 * 60 * 60 * 24;
    const options = {
        maxAge: oneDay,
        secure: true,
        httpOnly: true,
    };
    res.cookie('easychoice', Token, options);

    return {
        status: true,
        message: 'Successfully logged in'
    }
};


module.exports = {
    Login : Login 
};