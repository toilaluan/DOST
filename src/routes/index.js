const homeRouter = require('./home')
const docRouter = require('./docs')
function route(app){
    
    app.use('/doc', docRouter);
    app.use('/', homeRouter);
}

module.exports = route