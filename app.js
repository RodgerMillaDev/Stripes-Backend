const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const moment = require("moment");
const cors = require("cors");

const FormData = require('form-data');


const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.post('/compareFaces', async (req,res)=>{
    const { base64selfie, base64ID } = req.body;

    const options = {
        method: 'POST',
        url: 'https://face-recognition26.p.rapidapi.com/api/face_compare_base64',
        headers: {
          'x-rapidapi-key': '5143db4c77msh2c63df3a0683cc7p194ebfjsn474a41def10e',
          'x-rapidapi-host': 'face-recognition26.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          image1: base64selfie,
          image2: base64ID
        }
      };
      
      try {
          const response = await axios.request(options);

          console.log(response);
          res.json(response.data);   
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: error.message });

      }
})

app.listen(3111, () => {
    console.log(`Server is listening on port ${3111}`);
});






app.post('/extractIDdata', async (req,res)=>{
    const { base64ID } = req.body;

    const options = {
        method: 'POST',
        url: 'https://id-document-recognition2.p.rapidapi.com/api/iddoc_base64',
        headers: {
          'x-rapidapi-key': '5143db4c77msh2c63df3a0683cc7p194ebfjsn474a41def10e',
          'x-rapidapi-host': 'id-document-recognition2.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          image: base64ID,
        }
      };
      
    
      try {
        const response = await axios.request(options);

        console.log(response);
        res.json(response.data);   
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });

    }
    
})

app.post('/extractDLdata', async (req,res)=>{
    const { base64DL } = req.body;

    const options = {
        method: 'POST',
        url: 'https://id-document-recognition2.p.rapidapi.com/api/iddoc_base64',
        headers: {
          'x-rapidapi-key': '5143db4c77msh2c63df3a0683cc7p194ebfjsn474a41def10e',
          'x-rapidapi-host': 'id-document-recognition2.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          image: base64DL,
        }
      };
      
    
      try {
        const response = await axios.request(options);

        console.log(response);
        res.json(response.data);   
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });

    }
    
})

app.post('/extractlogbookdata', async (req,res)=>{
    const { base64Logbook } = req.body;

    const options = {
        method: 'POST',
        url: 'https://id-document-recognition2.p.rapidapi.com/api/iddoc_base64',
        headers: {
          'x-rapidapi-key': '5143db4c77msh2c63df3a0683cc7p194ebfjsn474a41def10e',
          'x-rapidapi-host': 'id-document-recognition2.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          image: base64Logbook,
        }
      };
      
    
      try {
        const response = await axios.request(options);

        console.log(response);
        res.json(response.data);   
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });

    }
    
})



app.post('/extractVedata', async (req, res) => {
  const { base64Vehicle } = req.body;

  if (!base64Vehicle) {
    return res.status(400).json({ error: 'Missing base64Vehicle in request body' });
  }

  try {
    const formData = new FormData();
    formData.append('upload', base64Vehicle);
    formData.append('regions', 'us-ca'); // Adjust as necessary

    const response = await axios.post('https://api.platerecognizer.com/v1/plate-reader/', formData, {
      headers: {
        ...formData.getHeaders(), // Automatically sets Content-Type as multipart/form-data
        Authorization: 'Token 7b0a66d28a3daeab4b3ee8984d5e1c8ca3ea2713',
      },
    });

    console.log(response.data);
    res.json(response.data); // Send the JSON response back to the client
  } catch (error) {
    console.error('Axios error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








app.get("/", (req, res) => {
  res.send("HELLO RODGER, YOU BACKEND IS RUNNING MY GUY!");
  var timeStamp = moment().format("YYYYMMDDHHmmss");
  console.log(timeStamp);
});
