const fetch = require('node-fetch');

const ACCESS_TOKEN = 'sl.Bb9r4V5PJ7jNj96daRRtcL2Lq4B_2YLLjqjkJ5netWP426c1v4wHQv2sOuhhfFm72CqpePMpokueodlSzASFQz-OtZODCcWmtyW0zoACJ5u08y1Ev77MYu3DxiXwFZERBGRzFzI';

async function getDirectLink(shared_link) {
  const response = await fetch('https://api.dropboxapi.com/2/sharing/shared_link', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: shared_link
    })
  });

  const data = await response.json();
  return data.url;
}
