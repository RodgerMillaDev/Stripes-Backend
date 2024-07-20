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







async function getAccessToken() {
  const consumer_key = "TBps15q8LIyQMFCG17z2bSFR5leldPafzoLvCxIdaYZV6sOj"; // REPLACE IT WITH YOUR CONSUMER KEY
  const consumer_secret = "fQDeKpslji2EygQBtFG2n5t9An5jHddcpuVHYpWA5cJGAFq6ShYm5GCqhe26zQTB"; // REPLACE IT WITH YOUR CONSUMER SECRET
  const url =
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth =
    "Basic " +
    Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    throw error;
  }
}

app.get("/", (req, res) => {
  res.send("HELLO RODGER, YOU BACKEND IS RUNNING MY GUY!");
  var timeStamp = moment().format("YYYYMMDDHHmmss");
  console.log(timeStamp);
});

//ACCESS TOKEN ROUTE
app.get("/access_token", (req, res) => {
  getAccessToken()
    .then((accessToken) => {
      res.send("😀 Your access token is " + accessToken);
    })
    .catch(console.log);
});

//MPESA STK PUSH ROUTE
app.post("/stkpush", (req, res) => {
//   const phoneNumber = req.body.phone;
  const phoneNumber =req.body.fonNumber;
  // const amount = req.body.amountPay;
  const amount = 1;

  console.log(amount,phoneNumber)
  getAccessToken()
    .then((accessToken) => {
      const url =
        "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + accessToken;
      const timestampx = moment().format("YYYYMMDDHHmmss");
      const password = Buffer.from(
        "6569484" +
          "072dfdb29aec324a1861e0ade32a8495fa125934db6d251738f24a713536833f" +
          timestampx
      ).toString("base64");

      axios
        .post(
          url,
          {
            BusinessShortCode: "6569484",
            Password: password,
            Timestamp: timestampx,
            TransactionType: "CustomerBuyGoodsOnline",
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: "8717440",
            PhoneNumber: phoneNumber,
            CallBackURL: "https://ubunifucollege.com/callback",
            AccountReference: "Bunny Scents",
            TransactionDesc: "Mpesa Bunny Scents payment",
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          // console.log(response.data.ResponseCode);
          // console.log(response.data.ResponseDescription);
          // console.log(response.data.CheckoutRequestID); // This is the mpesaReceiptNumber
          //const transactionRef = response.data.CheckoutRequestID;

          res.send(response.data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("❌ Request failed");
        });
    })
    .catch(console.log);
});



//MPESA STK PUSH ROUTE
app.post("/query", (req, res) => {
  const checkID = req.body.checkID;

  getAccessToken()
    .then((accessToken) => {
      const url =
        "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query";
      const auth = "Bearer " + accessToken;
      const timestampx = moment().format("YYYYMMDDHHmmss");
      const password = Buffer.from(
        "6569484" +
          "072dfdb29aec324a1861e0ade32a8495fa125934db6d251738f24a713536833f" +
          timestampx
      ).toString("base64");

      axios
        .post(
          url,
          {
            BusinessShortCode: "6569484",
            Password: password,
            Timestamp: moment().format("YYYYMMDDHHmmss"),
            CheckoutRequestID: checkID,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          res.send(response.data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("❌ Request failed");
        });
    })
    .catch(console.log);
});


app.post("/transactionstatus", (req, res) => {
  const mpesaReceiptNumber = req.body.mpesaReceiptNumber;

  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(
    "6569484" +
      "072dfdb29aec324a1861e0ade32a8495fa125934db6d251738f24a713536833f" +
      timestamp
  ).toString("base64");
  getAccessToken()
    .then((accessToken) => {
      const url =
        "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query";

      const auth = "Bearer " + accessToken;

      axios
        .post(
          url,
          {
            BusinessShortCode: "6569484",
            Password: password,
            Timestamp: moment().format("YYYYMMDDHHmmss"),
            CheckoutRequestID: mpesaReceiptNumber,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          res.json(response.data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("❌ Request failed");
        });
    })
    .catch(console.log);
});



app.listen(3111, () => {
  console.log(`Server is listening on port ${3111}`);
});



app.get("/", (req, res) => {
  res.send("HELLO RODGER, YOU BACKEND IS RUNNING MY GUY!");
  var timeStamp = moment().format("YYYYMMDDHHmmss");
  console.log(timeStamp);
});

