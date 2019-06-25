import Video from '../database/model/video'
const express = require('express');
const axios = require('axios');
const circularJson = require('circular-json');

const api = express();

api.get('/all', (req, res) => {
  const url = 'https://r3lovution-lotus-api.herokuapp.com/api/videos';
  fetch(url,res)
})

api.get('/:categorie', (req, res) => {
  console.log(req.params.catergorie)
  const url = 'https://r3lovution-lotus-api.herokuapp.com/api/videos';
  fetch(url,res)
})

function fetch(url, res) {
	  axios.get(url, {
	    headers: {
	        Accept: "application/json"
	    }
	  })
	  .then(response => {
	    res.send(response.data);
	  })
	  .catch(err => {
	    let json = circularJson.stringify(err.response);
	    res.send(JSON.parse(json))
	  });
	}

export default api;
