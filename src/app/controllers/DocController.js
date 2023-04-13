const { query } = require("express");
const call_api = require("./utils/OpenAPI");
const Doc = require("../models/Doc");
const gdUtils = require("./utils/GoogleDriveUtils");
const { authorize, uploadFile } = require("./utils/DriveAPI");
const readableDoc = require("./utils/Docs/readableDoc");
class ReadController {
  // [GET] /doc/show
  show(req, res) {
    if (!req.session.loggedin){
      let query = req.query;
      Doc.findById(query.id, (err, doc) => {
        if (err) {
          console.error(err);
        }
        // console.log(doc);
        // const t = readableDoc(doc, req);
        // console.log(t)
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
    }
    else {
      let query = req.query;
      Doc.findById(query.id, (err, doc) => {
        if (err) {
          console.error(err);
        }
        // console.log(doc);
        // const t = readableDoc(doc, req);
        // console.log(t)
        if (readableDoc(doc, req)) {
          doc = doc.toObject();
          let id = gdUtils.getFileIdFromUrl(doc.link);
          let previewLink = gdUtils.idToPreviewLink(id);
          doc.link = previewLink;
          
          // res.render("docs/show",{doc, layout: 'main_logined' });
          res.render("docs/show", Object.assign({}, doc, { layout: 'main_logined' }));

        } else {
          res.redirect("/");
        }
      });
    }
  }
  // [GET] /doc/upload
  upload(req, res, next) {
    res.render("docs/upload");
  }
  // [POST] /doc/store
  store(req, res) {
    if (req.file) {
      authorize()
        .then((client) => uploadFile(client, req))
        .then((uploadedFile) => call_api(uploadedFile, req))
        .then((new_doc) => console.log(new_doc))
        .catch(console.error);
    }
  }
  async store_confirm(req, res) {
    await Doc.create(req.body, (err, res) => {
      if (err) throw err;
      console.log("Upload successfully!");
    });
    res.redirect("/");
  }
}
module.exports = new ReadController();
