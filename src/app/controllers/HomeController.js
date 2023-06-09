const Doc = require('../models/Doc')
const fetch = require('node-fetch');
const ACCESS_TOKEN = 'YOUR_DROPBOX_ACCESS_TOKEN';
const readableDoc = require("./utils/Docs/readableDoc");

class HomeController {
  tag_choose = (req, res) => {

    let keywords = req.params.tag;
    let arr = keywords.split(/[ +]+/);
    let regexStr = new RegExp(arr.join("|"), "gi");
    Doc.find({
      tags: regexStr,
    })
      .limit(10)
      .sort({ occupation: -1 })
      .exec((err, docs) => {
        if (err) console.log("err");
        docs = docs.map((doc) => {
          let inner_link = "/doc/show?id=" + doc._id;
          doc = doc.toObject();
          doc.created_at = doc.created_at.toDateString();

          try {
            doc.tags = doc.tags.split(",");
          } catch (err) { }
          doc.inner_link = inner_link;
          return doc;
        });
        if (!req.session.loggedin) {
        res.render("home", { docs });
        }
        else {
          res.render("home", {docs, layout: 'main_logined' });
        }
      });

  }


  index(req, res) {
    if (!req.session.loggedin) {
      // res.render('home');
      Doc.find({}, function (err, docs) {
        if (!err) {
          docs = docs.map((doc) => {
            let inner_link = "/doc/show?id=" + doc._id;
            doc = doc.toObject();
            doc.created_at = doc.created_at.toDateString();
            try {
              doc.tags = doc.tags.split(",");
            } catch (err) { }
            doc.inner_link =
              inner_link;
            return doc;
          });
          res.render("home", { docs });
        } else {
          res.status(400).json({ error: "ERROR!!" });
        }
      });
    }
    else {
      // res.render('home');
      Doc.find({}, function (err, docs) {
        if (!err) {

          docs = docs.map((doc) => {

            let inner_link = "/doc/show?id=" + doc._id;
            doc = doc.toObject();
            doc.created_at = doc.created_at.toDateString();
            try {
              doc.tags = doc.tags.split(",");
            } catch (err) { }
            doc.inner_link = inner_link;
            return doc;
          });
          res.render("home", { docs, layout: 'main_logined' });
        } else {
          res.status(400).json({ error: "ERROR!!" });
        }
      });
    }
  }
}

module.exports = new HomeController();
