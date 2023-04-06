const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Set up OAuth2 client
const oAuth2Client = new OAuth2(
  '697089634099-p9qgi3p93lm4bdqc36k1a570t2gp1s9c.apps.googleusercontent.com',
  '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',
  'https://localhost'
);

// Set up credentials
oAuth2Client.setCredentials({
  access_token: 'ya29.a0Ael9sCP-tZrIYpG3sbLQfXfCbroGSx6jZ56ZfVh61okxm6OOGW7tda48gIzJJKe15yx_B_ApbzTmGc2RO6P5_dzm0XScGfHwIbrnU3wJsF7sg-5XIemhro-VTpF__HBgBtlQ6I6lYJrFmRY8Gs3aFPd5twxZaCgYKAU4SARMSFQF4udJh2coPA25UVHhi3AciOsGv2g0163',
  refresh_token: '1//04rHKUAK_Z9tyCgYIARAAGAQSNwF-L9IrrmUH0tTCLgJn2vF8G22rU_HRgI_iy7H9ArmgExVX662mzknO5lONdIsV1oGDc5bao-Q'
});

// Set up Drive API client
const drive = google.drive({ version: 'v3', auth: oAuth2Client });

// Get the file content
const fileId = '1gq7EE4_GeVf2J2rzVuz5HPDGcVRmLW6b';
drive.files.get(
  { fileId: fileId, alt: 'media' },
  { responseType: 'stream' },
  (err, res) => {
    if (err) {
      console.log(`An error occurred: ${err}`);
      return;
    }
    res.data.on('end', () => {
      console.log('File downloaded successfully');
    });
    res.data.on('error', (err) => {
      console.log(`An error occurred: ${err}`);
    });
    res.data.on('data', (data) => {
      console.log(`Received ${data.length} bytes of data`);
      // do something with the data, e.g. write to a file
    });
  }
);
