const homeRouter = require('./home')
const readRouter = require('./read')
function route(app){
    app.use('/read', readRouter);
    app.use('/', homeRouter);
}

module.exports = route