const User = require("../models/User");
const Doc = require("../models/Doc");
const readableDoc = require("./utils/Docs/readableDoc");

class ProfileController {
    index(req, res) {
        let username = req.session.user[0].username;
        let num_article;
        let user;
        User.find({ username: username }, (err, user) => {
            if (!user) {
                return res.status(400).send("Username not found");
            } else {
                num_article = user[0].id_docs.length;

                user = user[0].toObject();
            }
            Doc.find({ _id: { $in: user.id_docs.concat(user.id_docs_bought) } }, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(readableDoc(docs[0],req))
                    docs = docs.map((doc) => {
                        let inner_link =
                            "http://localhost:3000/read?id=" + doc._id;
                        doc = doc.toObject();
                        doc.created_at = doc.created_at.toDateString();

                        doc.tags = doc.tags.split(",");
                        doc.inner_link = inner_link;
                        return doc;
                    });
                    res.render("profile", {
                        docs,
                        username: user.username,
                        num_article: user.num_articles,
                        layout : 'main_logined'
                    });
                }
            });
            return "Done";
        });
    }
}

module.exports = new ProfileController();
