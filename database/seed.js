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

const photoIds = [1001, 237, 1005, 1011, 1012, 1025, 1027]; // TODO: add more

const profilePhotos = [];
photoIds.forEach((id) => {
  profilePhotos.push(`https://picsum.photos/${id}/1/200`);
});

const travelTypes = ['Family', 'Couple', 'Solo', 'Business', 'Friends'];

const years = [2016, 2017, 2018, 2019, 2020];

const seedData = [];

const attractionIds = [];
for (let i = 1; i <= 100; i += 1) {
  let id;
  if (i < 10) {
    id = '00' + i;
  } else if (i < 100) {
    id = '0' + i;
  } else {
    id = i.toString();
  }
  attractionIds.push(id);
}

attractionIds.forEach((id) => {
  const numReviews = generateNumBetween(1, 2); // TODO - increase

  for (let i = 0; i < numReviews; i += 1) {
    const year = years[generateNumBetween(0, years.length - 1)];
    const experienceDate = chance.date({ year });
    const month = experienceDate.getMonth();
    const monthsAfter = generateNumBetween(0, 3);
    const language = pickBiased(languages);
    const langIndex = languages.indexOf(language);
    const numImages = pickBiased([0, 1, 2, 3]);

    const review = {
      attractionId: id,
      rating: generateNumBetween(0, 5),
      travelType: travelTypes[generateNumBetween(0, travelTypes.length - 1)],
      expDate: experienceDate,
      lang: language,
      body: chance.paragraph(),
      title: chance.sentence({ words: generateNumBetween(1, 4) }),
      votes: generateNumBetween(0, 1000),
      createdAt: chance.date({ year, month: month + monthsAfter }),
      helpful: false,
      user: {
        originCountry: countries[langIndex],
        originRegion: regions[langIndex][generateNumBetween(0, regions[langIndex].length - 1)],
        contributions: generateNumBetween(0, 1000),
        name: chance.name(),
        profileImage: profilePhotos[generateNumBetween(0, profilePhotos.length - 1)],
      },
      uploadImages: [],
    };

    for (let j = 0; j < numImages; j += 1) {
      review.uploadImages.push('placeholder' + j.toString()); // TODO
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
