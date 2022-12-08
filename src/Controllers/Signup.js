const bcrypt = require('bcrypt');
const { User } = require('../Database/Schema/User');


const Signup = async (body) => {

    const { username, password } = body;

    if(username === undefined || password === undefined)
    return {
        status: false,
        message: 'Username and password are required'
    }

    //TODO Search if already exists the same username
    //TODO Verify username is valid i.e. without special caracters

    //Already add a salt
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt).then(async (hash) => {
            const user = new User({
                username: username,
                password: hash,
                salt: salt
            });
            await user.save();
        });
    });

    return {
        status: true,
        message: 'User added successfully'
    }

};


module.exports = {
    Signup: Signup
};