const bcrypt = require('bcrypt');
const { User } = require('../Database/Schema/User');


const Login = async (body) => {

    const { username, password } = body;

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

    const match = bcrypt.compare(password, Find[0].password).then(function(result) {
        return result;
    });
    
    if(!match) {
        return {
            status: false,
            message: 'Username or password is incorrect'
        }
    }

    //TODO Create a session and cookie for authentication purposes
    //References https://anaeljonas.medium.com/login-com-node-js-em-5-minutos-8b5598dacda2
    //https://www.youtube.com/watch?v=zt8Cocdy15c
    //https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
    //https://www.npmjs.com/package/bcrypt


    return {
        status: true,
        message: 'Successfully logged in'
    }
};


module.exports = {
    Login : Login 
};