const clarifaiApiCall = (req, res) => { 
    const IMAGE_URL = req.body.input;

    const raw = JSON.stringify({
        "user_app_id": {
          "user_id": process.env.USER_ID,
          "app_id": process.env.APP_ID
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
          'Authorization': 'Key ' + process.env.PAT,
        },
        body: raw,
    };

    fetch("https://api.clarifai.com/v2/models/" + process.env.MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => res.json(result))
      .catch(error => console.log('error', error));
}

module.exports = {
    clarifaiApiCall
};
