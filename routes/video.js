import Video from '../database/model/video'

const express = require('express');
const axios = require('axios');
const circularJson = require('circular-json');

const api = express();

api.get('/all', (req, res) => {
  const url = 'https://r3lovution-lotus-api.herokuapp.com/api/videos';
  fetch(url,res)
})

export default api;
