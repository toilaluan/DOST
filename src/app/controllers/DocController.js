const { query } = require("express");
const call_api = require("./utils/OpenAPI");
const Doc = require("../models/Doc");
const gdUtils = require("./utils/GoogleDriveUtils");
const { authorize, uploadFile } = require("./utils/DriveAPI");
class ReadController {
  // [GET] /doc/show
  show(req, res) {
    let query = req.query;
    Doc.findById(query.id, (err, doc) => {
      if (err) {
        console.error(err);
      } else {
        doc = doc.toObject();
        let id = gdUtils.getFileIdFromUrl(doc.link);
        let previewLink = gdUtils.idToPreviewLink(id);
        doc.link = previewLink;
        res.render("docs/show", doc);
      }
    });
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
  store_confirm(req, res) {
    res.render()
  }
}
module.exports = new ReadController();
