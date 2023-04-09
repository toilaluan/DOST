

class SignupController{
    index(req, res){
        res.render('signup', {style: 'app.css'});
    }
}

module.exports = new SignupController;

