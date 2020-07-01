const Chance = require('chance');
const Review = require('./Reviews.js');
const { generateNumBetween, pickBiased, generateAttractionIds } = require('./helpers.js');

const chance = new Chance();

const languages = [
  'English',
  'Spanish',
  'Italian',
  'French',
  'Portuguese',
  'German',
  'Chinese',
  'Japanese',
  'Korean',
];

const countries = [
  'United States',
  'Spain',
  'Italy',
  'France',
  'Portugal',
  'Germany',
  'China',
  'Japan',
  'South Korea',
];

const regions = [
  ['Washington State', 'California', 'Oregon', 'Texas'],
  ['Andalucia', 'Aragon', 'Basque Country', 'Canary Islands'],
  ['Abruzzo', 'Calabria', 'Lazio', 'Marche'],
  ['Avignon', 'Bordeaux', 'Corse', 'Nouvelle-Aquitaine'],
  ['Aveiro', 'Beja', 'Braga', 'Lisbon'],
  ['Bavaria', 'Berlin', 'Brandenburg', 'Hesse'],
  ['Hubei', 'Hainan', 'Shanghai', 'Hunan'],
  ['Osaka', 'Kyoto', 'Tokyo', 'Okinawa'],
  ['Gangwon', 'North Jeolla', 'South Jeolla', 'Jeju'],
];

const commonWords = [
  'lovely',
  'clean',
  'beautiful',
  'pricey',
  'sunny',
  'warm',
  'beach',
  'pool',
  'hotel',
  'location',
];

const weightedRatings = [4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 1, 1, 0];

const uploadBase = 'https://fec-images-6-18-20.s3-us-west-2.amazonaws.com/userUploads';
const profileBase = 'https://fec-images-6-18-20.s3-us-west-2.amazonaws.com/profiles';

const profilePhotos = [];
for (let i = 0; i < 20; i += 1) {
  profilePhotos.push(`${profileBase}/img${i}.jpg`);
}

const userUploadPhotos = [];
for (let i = 0; i < 100; i += 1) {
  userUploadPhotos.push(`${uploadBase}/img${i}.jpg`);
}

const travelTypes = ['Family', 'Couple', 'Solo', 'Business', 'Friends'];

const years = [2016, 2017, 2018, 2019, 2020];

const attractionIds = generateAttractionIds();

const seedData = [];

attractionIds.forEach((id) => {
  const numReviews = generateNumBetween(25, 200);
  const attractionName = chance.city();

  for (let i = 0; i < numReviews; i += 1) {
    const year = years[generateNumBetween(0, years.length - 1)];
    const expDate = chance.date({ year });
    const month = expDate.getMonth();
    const monthsAfter = generateNumBetween(0, 3);
    const createdAt = chance.date({ year, month: month + monthsAfter });
    const lang = pickBiased(languages);
    const langIndex = languages.indexOf(lang);
    const numImages = pickBiased([0, 1, 2, 3]);
    const name = chance.name();
    const title = chance.sentence({ words: generateNumBetween(1, 4) });
    const rating = weightedRatings[generateNumBetween(0, weightedRatings.length - 1)];

    let body = chance.paragraph().split(' ');
    body.splice(3, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
    body.splice(5, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
    body.splice(8, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
    body.splice(12, 0, commonWords[generateNumBetween(0, commonWords.length - 1)]);
    body = body.join(' ');

    const review = {
      attractionId: id,
      attractionName,
      rating,
      travelType: travelTypes[generateNumBetween(0, travelTypes.length - 1)],
      expDate,
      lang,
      body,
      title,
      votes: generateNumBetween(0, 1000),
      createdAt,
      helpful: false,
      user: {
        originCountry: countries[langIndex],
        originRegion: regions[langIndex][generateNumBetween(0, regions[langIndex].length - 1)],
        contributions: generateNumBetween(0, 1000),
        name,
        profileImage: profilePhotos[generateNumBetween(0, profilePhotos.length - 1)],
      },
      uploadImages: [],
    };

    for (let j = 0; j < numImages; j += 1) {
      review.uploadImages.push({
        id: id + i + j,
        helpful: false,
        url: userUploadPhotos[generateNumBetween(0, userUploadPhotos.length - 1)],
        username: name,
        createdAt,
        reviewTitle: title,
        reviewRating: rating,
      });
    }

    seedData.push(review);
  }
});

Review.create(seedData)
  .then(() => {
    console.log('success');
  })
  .catch((err) => {
    console.log(err);
  });
