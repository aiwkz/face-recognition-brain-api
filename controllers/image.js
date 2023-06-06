const https = require('https');

const clarifaiApiCall = (req, res) => {
  const PAT = '10881e14e6ec49e185af430e206583ca';
  const USER_ID = 'aiwkz';
  const APP_ID = 'face-recognition-brain';
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = req.body.input;
   const data = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });
   const options = {
    hostname: 'api.clarifai.com',
    path: `/v2/models/${MODEL_ID}/outputs`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Key ${PAT}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };
   const request = https.request(options, (response) => {
    let responseData = '';
     response.on('data', (chunk) => {
      responseData += chunk;
    });
     response.on('end', () => {
      const result = JSON.parse(responseData);
      res.json(result);
    });
  });
   request.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  });
   request.write(data);
  request.end();
};
 module.exports = {
  clarifaiApiCall,
};
