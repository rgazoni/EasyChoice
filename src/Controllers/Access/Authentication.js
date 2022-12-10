const jwt = require('jsonwebtoken');

const Authentication = async (req, res) => {

    Auth = req.cookies.easychoice || null;

    if(typeof Auth === 'undefined' || Auth === '' || Auth === null){
        return{
            status: false,
            message: 'Unauthorized'
        };
    } else {
        try {
            const payload = await jwt.verify(req.cookies.easychoice, process.env.JWT_SECRET);
            return {
                status: true,
                message: '',
                data: { id: payload.id }
            };
        } catch(err) {
            return {
                status: false,
                message: 'Unauthorized'
            };
        }
    }
}

module.exports = {
    Authentication : Authentication 
};