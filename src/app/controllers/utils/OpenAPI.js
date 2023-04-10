const fs_raw = require('fs');
const Doc = require('../../models/Doc')
const PDFParser = require('pdf-parse');
const { api_key, prompts } = require('./prompts')
const request = require('request');
async function call_api(uploadedFile, req) {
    const file_stream = fs_raw.readFileSync(req.file.path)
    PDFParser(file_stream).then((data) => {
        // Log the parsed text from the PDF
        const doc = data.text.slice(0, 3000)
        const options = {
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + api_key // Replace with your actual API key
            },
            json: {
                "model": "gpt-3.5-turbo",
                "messages": [
                    { "role": "system", "content": prompts.system },
                    { "role": "user", "content": doc },
                    { "role": "user", "content": prompts.gen_prompt }
                    // { "role": "user", "content": "say hello" },
                ],
                "temperature": 0
            }
        };
        request.post(options, (error, response, body) => {
            if (error) {
                console.error(error);
            } else {
                const gpt_output = JSON.parse(response.body.choices[0].message.content)
                const summary = gpt_output.summary
                const tags = gpt_output.tags
                const link = 'https://drive.google.com/file/d/' + uploadedFile.data.id
                const title = req.body.title
                const new_doc = {
                    link: link,
                    title: title,
                    summary: summary,
                    tags: tags

                }
                Doc.create(new_doc, (err, result) => {
                    if (err) throw err
                })
            }
        });

    });
}
module.exports = call_api