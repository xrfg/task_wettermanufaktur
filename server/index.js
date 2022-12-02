//! proxy server
//! NOT IN USE
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const axios = require("axios").default;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/token", (req, res) => {
  const options = {
    method: "POST",
    url: "https://weathersolutions.eu.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "8ACYTwEZXKpZEFabN88x3n5H661b08wC",
      client_secret:
        "AajeKAG-H8DOcdjNGnoxj8soJEWiFg7vnuZnA0VXVVIGQDJ84ZAfbqEFhpMUP_kz",
      audience: "https://shopman.metops.net",
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      return res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
