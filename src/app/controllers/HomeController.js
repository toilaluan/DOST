const Doc = require('../models/Doc')
class HomeController{
    index(req, res){
        
        // res.render('home');
        Doc.find({}, function (err, docs){
            if (!err){
                docs = docs.map(doc => {
                    doc = doc.toObject();
                    doc.tags = doc.tags.split(',');
                    console.log(doc.tags);
                    return doc;
                })
                // console.log(docs)
                res.render('home', {docs})
            }else{ 
                res.status(400).json({error: "ERROR!!"});
            }
        })
    }
}

module.exports = new HomeController;

