const fs = require('fs');
const path = require('path');
const axios = require('axios');

const uploadImgDir = path.resolve(__dirname, '..', 'images', 'uploads');
const profileImgDir = path.resolve(__dirname, '..', 'images', 'profiles');

for (let i = 0; i < 100; i += 1) {
  axios({
    url: 'https://picsum.photos/300/200',
    method: 'get',
    responseType: 'stream',
  })
    .then((res) => {
      res.data.pipe(fs.createWriteStream(`${uploadImgDir}/img${i}.jpg`));
    })
    .catch((err) => {
      console.error('axios error ', err);
    });
}

for (let i = 0; i < 20; i += 1) {
  axios({
    url: 'https://picsum.photos/100',
    method: 'get',
    responseType: 'stream',
  })
    .then((res) => {
      res.data.pipe(fs.createWriteStream(`${profileImgDir}/img${i}.jpg`));
    })
    .catch((err) => {
      console.error('axios error ', err);
    });
}
