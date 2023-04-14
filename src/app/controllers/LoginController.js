const User = require('../models/User')


function encode(s) {
    return s;
}
class LoginController {
    index(req, res) {
        res.render('login', { style: 'app.css' });
    }
    checkLogin(req, res) {
        // Insert Login Code Here


        let username = req.body.username
        let password = req.body.password
        if (username == '' || password == '') {
            return res.redirect("/login");
        }

        // encode username,password
        password = encode(password);


        /// Do User chi co 1 ten tai khoan nen khi tra ve mang ta dung luon user[0]
        User.find({ username: username }, (err, user) => {
            if (user.length ==0) {         
                return res.redirect("/login");
            }


            if (user[0].password == password) {
                req.session.loggedin = true;
                req.session.user = user;
                return res.redirect("/profile");
            }
            else {
                res.redirect("/login");
                console.log("Password Invalid");
                return "Password Invalid";
            }

        });
    }
    logout = (req, res) => {
        req.session.destroy((err) => {
            if (err) res.render('ERROR /500');
            res.redirect('/');
        })
    }
}

module.exports = new LoginController();
