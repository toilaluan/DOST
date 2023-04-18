const fs = require("fs");
const FormData = require("form-data");
const { default: axios } = require("axios");
async function call_api(uploadedFile, req) {
	const fileStream = fs.createReadStream(req.file.path);
	const form = new FormData();
	let new_doc = null;
	form.append("pdf_file", fileStream);
	await axios
		.post(`http://localhost:${process.env.AI_PORT}/init_doc`, form, {
			headers: form.getHeaders(),
		})
		.then((response) => {
			data = response.data
			title = data.title;
			tags = data.tags;
			summary = data.summary;
			const link =
				"https://drive.google.com/file/d/" + uploadedFile.data.id;
			new_doc = {
				link: link,
				title: title,
				summary: summary,
				tags: tags,
			};
		})
		.catch((error) => {
			console.error(error);
		});
	return new_doc;
}

module.exports = call_api;
