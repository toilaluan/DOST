const Doc = require('../models/Doc')
const fetch = require('node-fetch');
const ACCESS_TOKEN = 'YOUR_DROPBOX_ACCESS_TOKEN';

class HomeController{
    index(req, res){
        
        // res.render('home');
        Doc.find({}, function (err, docs){
            if (!err){
                docs = docs.map(doc => {
                    let inner_link = 'http://localhost:3000/doc/show?id='+doc._id;
                    doc = doc.toObject();
                    try{
                        doc.tags = doc.tags.split(',');
                    }catch(err){
                        
                    }
                    doc.inner_link = inner_link;
                    return doc;
                })
                res.render('home', {docs})
            }else{ 
                res.status(400).json({error: "ERROR!!"});
            }
        })
    }
}

module.exports = new HomeController;

