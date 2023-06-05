const clarifaiApiCall = (req, res) => {
    const PAT = '10881e14e6ec49e185af430e206583ca';
    const USER_ID = 'aiwkz';       
    const APP_ID = 'face-recognition-brain';
    const MODEL_ID = 'face-detection';  
    const IMAGE_URL = req.body.input;

    const raw = JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": IMAGE_URL
              }
            }
          }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
        },
        body: raw,
        mode: 'cors',
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => res.json(result))
      .catch(error => console.log('error', error));
}

module.exports = {
    clarifaiApiCall
};
