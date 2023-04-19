const { query } = require("express");
const call_api = require("./utils/OpenAPI");
const Doc = require("../models/Doc");
const gdUtils = require("./utils/GoogleDriveUtils");
const { authorize, uploadFile } = require("./utils/DriveAPI");
const readableDoc = require("./utils/Docs/readableDoc");
const url = require("url");
const axios = require("axios");
require("dotenv").config();

class ReadController {
	show(req, res) {
		if (!req.session.loggedin) {
			let query = req.query;
			Doc.findById(query.id)
				.select({ embed: 0 })
				.exec((err, doc) => {
					if (err) {
						console.error(err);
					}
					if (readableDoc(doc, req)) {
						doc = doc.toObject();
						let id = gdUtils.getFileIdFromUrl(doc.link);
						let previewLink = gdUtils.idToPreviewLink(id);
						doc.link = previewLink;
						res.render("docs/show", doc);
					} else {
						res.redirect("/");
					}
				});
		} else {
			let query = req.query;
			Doc.findById(query.id)
				.select({ embed: 0 })
				.exec((err, doc) => {
					if (err) {
						console.error(err);
					}
					if (readableDoc(doc, req)) {
						doc = doc.toObject();
						let id = gdUtils.getFileIdFromUrl(doc.link);
						let previewLink = gdUtils.idToPreviewLink(id);
						doc.link = previewLink;
						res.render(
							"docs/show",
							Object.assign({}, doc, { layout: "main_logined" })
						);
					} else {
						res.redirect("/");
					}
				});
		}
	}


	upload(req, res, next) {
		if (!req.session.loggedin){
			res.render("docs/upload");
		}
		else {
			res.render("docs/upload", {layout: "main_logined"});
		}
	}
	
	store(req, res) {
		if (req.file) {
			authorize()
				.then((client) => uploadFile(client, req))
				.then((uploadedFile) => call_api(uploadedFile, req))
				.then((new_doc) => {
					if (!req.session.loggedin){
						res.render("docs/store", new_doc);
					}
					else {
						res.render("docs/store", new_doc, {layout: "main_logined"});
					}
				}) 
				.catch(console.error);
		}
	}
	async store_confirm(req, res) {
		await Doc.create(req.body, (err, res) => {
			if (err) throw err;
			const data = {
				id: res._id,
			};
			axios
				.post(
					`http://localhost:${process.env.AI_PORT}/upload_init_embed`,
					data
				)
				.then((response) => {
					console.log(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
			console.log("Upload successfully!");
		});
		res.redirect("/");
	}
	chat(req, res) {
		Doc.findById(req.query.id, (err, doc) => {
			if (err) {
				console.error(err);
			}
			try {
				doc = doc.toObject();
				let id = gdUtils.getFileIdFromUrl(doc.link);
				let previewLink = gdUtils.idToPreviewLink(id);
				doc.link = previewLink;
				const data = {
					id: req.query.id,
				};
				axios
					.post(`http://localhost:${process.env.AI_PORT}/init`, data)
					.then((response) => {
						console.log(response.data);
					})
					.catch((error) => {
						console.error(error);
					});


					
						if (!req.session.loggedin){
							res.render("docs/chat", doc);
						}
						else {
							
							let merge = Object.assign({},doc,{layout: "main_logined"})
							res.render("docs/chat", merge);
						}

					 }	 catch(e) {
        			console.log(e)
				res.redirect("/");
			}
		});
	}
}
module.exports = new ReadController();
