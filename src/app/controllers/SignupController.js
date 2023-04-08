

docs = [{title : 'biendeptrai',summary: 'Qua dep trai',tags: 'deptrai', link: 'fine'}]
class SignupController{
    index(req, res){
        res.render('signup', {docs,style: 'app.css'});
    }
}

module.exports = new SignupController;

