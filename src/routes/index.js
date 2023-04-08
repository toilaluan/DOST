const homeRouter = require('./home')
const readRouter = require('./read')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const profilepRouter = require('./profile')
// console.count(homeRouter)
   
      

function route(app){
    app.use('/read', readRouter);
    app.use('/login',loginRouter);
    app.use('/signup',signupRouter);
    app.use('/profile',profilepRouter);
    app.use('/', homeRouter);
}

module.exports = route