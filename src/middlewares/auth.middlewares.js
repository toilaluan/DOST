class Middlewares{
    loggedin = (req, res, next) => {
        if (req.session.loggedin) {
            res.locals.user = req.session.user
            next();
        } else {
            res.redirect('/login')
        }
    };
    isAuth = (req, res, next) => {
        if (req.session.loggedin) {
            res.locals.user = req.session.user
            res.redirect('/home');
        } else {
            next();
        }
    }
}

module.exports = new Middlewares;