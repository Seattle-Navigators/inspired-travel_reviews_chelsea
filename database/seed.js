const Chance = require('chance');
const Review = require('./Reviews.js');

const chance = new Chance();

const generateNumBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const pickBiased = (array) => {
  const index = generateNumBetween(0, 100);
  if (index <= 75) {
    return array[0];
  }
  const newIndex = generateNumBetween(1, array.length - 1);
  return array[newIndex];
};

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

const attractionIds = [];
for (let i = 1; i <= 100; i += 1) {
  let id;
  if (i < 10) {
    id = `00${i}`;
  } else if (i < 100) {
    id = `0${i}`;
  } else {
    id = i.toString();
  }
  attractionIds.push(id);
}

const seedData = [];

attractionIds.forEach((id) => {
  const numReviews = generateNumBetween(1, 100);
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
    const rating = generateNumBetween(0, 5);

    const review = {
      attractionId: id,
      attractionName,
      rating,
      travelType: travelTypes[generateNumBetween(0, travelTypes.length - 1)],
      expDate,
      lang,
      body: chance.paragraph(),
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
