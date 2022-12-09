const bcrypt = require('bcrypt');
const { User } = require('../Database/Schema/User');

const hasUser = async (body) =>{
    const {username} = body;
  
    const Find = await User.find({ username:username })
    .then(response =>{
        return response;
    }).catch(err =>{
        return {
            status: false,
            message:err
        }
    });
   
    if(Find.length !== 0){
        return true;
    }
    return false;
}

const Signup = async (body) => {

    const { username, password } = body;

    if(username === undefined || password === undefined)
    return {
        status: false,
        message: 'Username and password are required'
    }

    //TODO Verify username is valid i.e. without special caracters 
    if(! await hasUser(body)){
         //Already add a salt
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds).then(async (hash) => {
            const user = new User({
                username: username,
                password: hash
            });
            await user.save();
        });

        return {
            status: true,
            message: 'User added successfully'
        }
    }
    else{
        return {
            status: false,
            message: 'user already exist'
        }
    }
};

module.exports = {
    Signup: Signup
};