const homeRouter = require('./home')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const profilepRouter = require('./profile')
const docRouter = require('./docs')
const searchRouter = require('./search')


function route(app){
    app.use('/doc', docRouter);
    app.use('/login',loginRouter);
    app.use('/signup',signupRouter);
    app.use('/search',searchRouter);
    app.use('/profile',profilepRouter);
    app.use('/', homeRouter);
}

module.exports = route