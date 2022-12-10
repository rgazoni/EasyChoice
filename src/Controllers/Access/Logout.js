const Logout = (req, res) => {
    res.clearCookie('easychoice');
    res.redirect('/');
};

module.exports = {
    Logout : Logout 
};