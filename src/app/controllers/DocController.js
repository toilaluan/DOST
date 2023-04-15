const { query } = require("express");
const call_api = require("./utils/OpenAPI");
const Doc = require("../models/Doc");
const gdUtils = require("./utils/GoogleDriveUtils");
const { authorize, uploadFile } = require("./utils/DriveAPI");
const readableDoc = require("./utils/Docs/readableDoc");
const url = require("url");
const axios = require("axios");

class ReadController {
  show(req, res) {
    if (!req.session.loggedin) {
      let query = req.query;
      Doc.findById(query.id, (err, doc) => {
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
      Doc.findById(query.id, (err, doc) => {
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
    res.render("docs/upload");
  }
  store(req, res) {
    if (req.file) {
      // res.render("docs/store", {
      //   price: 0,
      //   downloads: 0,
      //   views: 0,
      //   created_at: {
      //     $date: "2023-04-13T16:40:49.000Z",
      //   },
      //   title:
      //     "Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection\r\n",
      //   summary:
      //     "This paper proposes an open-set object detector called Grounding DINO, which marries Transformer-based detector DINO with grounded pre-training to detect arbitrary objects with human inputs such as category names or referring expressions. The proposed model performs remarkably well on benchmarks on COCO, LVIS, ODinW, and RefCOCO/+/g, achieving a 52.5AP on the COCO detection zero-shot transfer benchmark and setting a new record on the ODinW zero-shot benchmark with a mean 26.1AP.\r\n",
      //   tags: "open-set object detection, Transformer-based detector, grounded pre-training, human inputs, benchmarks, COCO, LVIS, ODinW, RefCOCO/+/g.",
      //   link: "https://drive.google.com/file/d/1wVoomJ9JPaj8MnXIyWlXGECD1idAVEN1",
      //   __v: 0,
      // });
      authorize()
        .then((client) => uploadFile(client, req))
        .then((uploadedFile) => call_api(uploadedFile, req))
        .then((new_doc) => res.render("docs/store", new_doc))
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
  chat(req, res) {
    Doc.findById(req.query.id, (err, doc) => {
      console.log(doc.link);
      const data = {
        link: doc.link,
      };
      axios
        .post("http://localhost:8000/init", data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      res.render("docs/chat", { id: req.query.id });
    });
  }
}
module.exports = new ReadController();
