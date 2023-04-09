const User = require("../models/User");
const Doc = require("../models/Doc");

class ProfileController {
    index(req, res) {
        let username = "bien@gmail.com";
        let num_article;
        let user;
        User.find({ username: username }, (err, user) => {
            if (!user) {
                return res.status(400).send("Username not found");
            } else {
                num_article = user[0].id_docs.length;

                user = user[0].toObject();
            }
            Doc.find({ _id: { $in: user.id_docs } }, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    docs = docs.map((doc) => {
                        let inner_link =
                            "http://localhost:3000/read?id=" + doc._id;
                        doc = doc.toObject();
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
