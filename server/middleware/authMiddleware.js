module.exports = {
    usersOnly: (req, res, next) => {
        if(!req.session.user){
            res.status(401).send('Please login');
        }else {
            next();
        }
    },
    adminsOnly: (req, res, next) => {
        if (req.session.user.isAdmin === false){
            res.status(403).send('You are not an Admin!');
        } else {
            next()
        };
    }
}