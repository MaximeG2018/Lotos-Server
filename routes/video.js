import Video from "../database/model/video";
import asyncMiddleware from "../middleware/asyncMiddleware";
const express = require("express");
const axios = require("axios");
const circularJson = require("circular-json");

const api = express();

api.get("/all", (req, res) => {
  const url = "https://r3lovution-lotus-api.herokuapp.com/api/videos";
  fetch(url, res);
});

api.get(
  "/:categorie",
  asyncMiddleware(async (req, res) => {
    const url = "https://r3lovution-lotus-api.herokuapp.com/api/videos";
    await fetchbyCategorie(url, req, res);
  })
);

function fetch(url, res) {
  axios
    .get(url, {
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      let json = circularJson.stringify(err.response);
      res.send(JSON.parse(json));
    });
}
async function fetchbyCategorie(url, req, res) {
  await axios
    .get(url, {
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      // const data = JSON.parse(response.data);
      console.log("ok");
      response.data.data.videos.map(items => {
        if (items.category === req.params.categorie) {
          console.log(items);
          res.send(items);
        } else {
          res.send({});
        }
      });
    })
    .catch(err => {
      console.log("ko");
      res.send(err);
    });
}

export default api;
