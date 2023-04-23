const Doc = require("../models/Doc");
const axios = require("axios");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class SearchController {
	index(req, res) {
		if (!req.session.loggedin) {
			res.render("search", { search_css: "search.css" });
		} else {
			res.render("search", {
				layout: "main_logined",
				search_css: "search.css",
			});
		}
	}
	searchKey(req, res) {
		if (!req.session.loggedin) {
			let keywords = req.body.keyword;
			axios
				.post(`http://localhost:${process.env.AI_PORT}/search`, {
					text: keywords,
				})
				.then((response) => {
					const doc_ids = response.data;
					console.log(doc_ids);
					const objIds = doc_ids.map((id) => ObjectId(id));
					Doc.find({ _id: { $in: objIds } })
						.exec((err, docs) => {
							if (err) {
								console.error(err);
							} else {
								const sorted_docs = []
								
								docs = docs.map((doc) => {
									console.log(doc._id);
									let inner_link = "/doc/show?id=" + doc._id;
									doc = doc.toObject();
									doc.created_at =
										doc.created_at.toDateString();

									try {
										doc.tags = doc.tags.split(",");
									} catch (err) {}
									doc.inner_link = inner_link;
									return doc;
								});
								res.render("search", { docs });
							}
						});
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			let keywords = req.body.keyword;
			axios
				.post(`http://localhost:${process.env.AI_PORT}/search`, {
					text: keywords,
				})
				.then((response) => {
					const doc_ids = response.data;
					Doc.find({ _id: { $in: doc_ids } }, (err, docs) => {
						if (err) {
							console.error(err);
						} else {
							docs = docs.map((doc) => {
								let inner_link = "/doc/show?id=" + doc._id;

								doc = doc.toObject();
								doc.created_at = doc.created_at.toDateString();

								try {
									doc.tags = doc.tags.split(",");
								} catch (err) {}
								doc.inner_link = inner_link;
								return doc;
							});
							res.render("search", {
								docs,
								layout: "main_logined",
							});
						}
					});
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	//[POST]
}

module.exports = new SearchController();
