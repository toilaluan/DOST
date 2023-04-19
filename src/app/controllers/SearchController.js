const Doc = require("../models/Doc");

class SearchController {
  index(req, res) {
    if (!req.session.loggedin){
      res.render("search", {  search_css: "search.css" });
    }
    else {
      res.render("search", {  layout : 'main_logined',search_css: "search.css" });
    }
  }
  searchKey(req, res) {
    if (!req.session.loggedin){
      let keywords = req.body.keyword;
      let arr = keywords.split(/[ ,]+/);
      let regexStr = new RegExp(arr.join("|"), "gi");
      Doc.find({
        tags: regexStr,
      })
        .limit(10)
        .sort({ occupation: -1 })
        .exec((err, docs) => {
          if (err) console.log("err");
          docs = docs.map((doc) => {
            let inner_link = "http://localhost:3000/doc/show?id=" + doc._id;
            doc = doc.toObject();
          doc.created_at = doc.created_at.toDateString();

            try {
              doc.tags = doc.tags.split(",");
            } catch (err) {}
            doc.inner_link = inner_link;
            return doc;
          });
          res.render("search", { docs });
        });
    }
    else{
      let keywords = req.body.keyword;
      let arr = keywords.split(/[ ,]+/);
      let regexStr = new RegExp(arr.join("|"), "gi");
      Doc.find({
        tags: regexStr,
      })
        .limit(10)
        .sort({ occupation: -1 })
        .exec((err, docs) => {
          if (err) console.log("err");
          docs = docs.map((doc) => {
            let inner_link = "http://localhost:3000/doc/show?id=" + doc._id;
            doc = doc.toObject();
          doc.created_at = doc.created_at.toDateString();

            try {
              doc.tags = doc.tags.split(",");
            } catch (err) {}
            doc.inner_link = inner_link;
            return doc;
          });
          res.render("search", { docs ,layout :'main_logined'});
        });
    }
  }

  //[POST]
}

module.exports = new SearchController();
