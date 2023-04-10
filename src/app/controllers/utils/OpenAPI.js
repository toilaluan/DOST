const fs_raw = require("fs");
const Doc = require("../../models/Doc");
const PDFParser = require("pdf-parse");
const { api_key, prompts } = require("./prompts");
const request = require("request");
async function call_api(uploadedFile, req) {
  const file_stream = fs_raw.readFileSync(req.file.path);
  PDFParser(file_stream).then((data) => {
    const doc = data.text.slice(0, 5000);
    const default_promt = `We have provided context information below: \n"
            "---------------------\n"
            "${doc}\n"
            "---------------------\n"
            "Given this information, Please answer my question in the same language that I used to ask you.\n"
            "Please answer the question: ${prompts.gen_prompt}\n`;
    const options = {
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + api_key,
      },
      json: {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompts.system },
          { role: "user", content: default_promt },
        ],
        temperature: 0.0,
      },
    };
    request.post(options, (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        console.log(response.body);
        const out = response.body.choices[0].message.content;
        console.log(out);
        var title_index = out.indexOf("Title:");
        var summary_index = out.indexOf("Summary:");
        var tag_index = out.indexOf("Tags:");
        const title = out.slice(title_index + 7, summary_index);
        const summary = out.slice(summary_index + 9, tag_index);
        const tags = out.slice(tag_index + 6);
        const link = "https://drive.google.com/file/d/" + uploadedFile.data.id;
        const new_doc = {
          link: link,
          title: title,
          summary: summary,
          tags: tags,
        };
        Doc.create(new_doc, (err, res) => {
          if (err) throw err;
          console.log("Upload successfully!");
        });
      }
    });
  });
}
module.exports = call_api;
