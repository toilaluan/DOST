const { query } = require('express')
const Doc = require('../models/Doc')
const gdUtils = require('./utils/GoogleDriveUtils')
class ReadController {
    index(req, res) {
        let query = req.query
        Doc.findById(query.id, (err, doc) => {
            if (err) {
                console.error(err)
            } else {
                doc = doc.toObject();
                let id = gdUtils.getFileIdFromUrl(doc.link)
                let previewLink = gdUtils.idToPreviewLink(id)
                doc.link = previewLink
                res.render('read', doc)
            }
        })

    }
}
module.exports = new ReadController()