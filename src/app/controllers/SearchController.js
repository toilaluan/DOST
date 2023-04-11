docs = [
  {
    title: "biendeptrai",
    summary: "Qua dep trai",
    tags: "deptrai",
    link: "fine",
  },
];
const Doc = require("../models/Doc");
class SearchController {
  index(req, res) {
    
    res.render("search", { docs, search_css: "search.css" });
  }
  searchKey(req,res){
    let keywords = req.body.keyword;
    let arr = keywords.split(/[ ,]+/);
    let regexStr = new RegExp(arr.join("|"), "gi");
    Doc.find({
        'tags' :  regexStr ,
    })
      .limit(10)
      .sort({ occupation: -1 })
      .exec((err,docs)=>{
        console.log(docs);
        if(err) console.log('err');
        docs = docs.map(doc => {
            let inner_link = 'http://localhost:3000/doc/show?id='+doc._id;
            doc = doc.toObject();
            try{
                doc.tags = doc.tags.split(',');
            }catch(err){
                
            }
            doc.inner_link = inner_link;
            // console.log(doc.title);
            return doc;
        });
        res.render('search', {docs})
      });
  }

  //[POST]
}

module.exports = new SearchController();
