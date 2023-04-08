

docs = [{title : 'biendeptrai',summary: 'Qua dep trai',tags: 'deptrai', link: 'fine'}]
class LoginController{
    index(req, res){
        res.render('login', {docs,style: 'app.css'});
    }
}

module.exports = new LoginController;

