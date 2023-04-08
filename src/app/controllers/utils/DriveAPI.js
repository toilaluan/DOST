const fs = require('fs').promises;
const fs_raw = require('fs');
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const Doc = require('../../models/Doc')
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(process.cwd(), 'src/public/drive_token/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'src/public/drive_token/credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function uploadFile(authClient, req) {
    const drive = google.drive({ version: 'v3', auth: authClient })
    const requestBody = {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        parents: [process.env.FOLDER_ID]
    };
    const media = {
        mimeType: req.file.mimetype,
        body: fs_raw.createReadStream(req.file.path)
    };
    try {
        const uploadedFile = await drive.files.create(
            {
                requestBody: requestBody,
                media: media,
            });
        if (uploadedFile){
            const link = 'https://drive.google.com/file/d/' + uploadedFile.data.id
            console.log(link)
            const title = req.body.title
            const new_doc = {
                link: link,
                title: title
            }
            Doc.create(new_doc, (err, result) => {
                if (err) throw err
            })
        }
        console.log('Upload successfully!')
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    authorize,
    uploadFile
}