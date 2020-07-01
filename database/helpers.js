module.exports.generateNumBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

module.exports.pickBiased = (array) => {
  const index = module.exports.generateNumBetween(0, 100);
  if (index <= 75) {
    return array[0];
  }
  const newIndex = module.exports.generateNumBetween(1, array.length - 1);
  return array[newIndex];
};

module.exports.generateAttractionIds = () => {
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
  return attractionIds;
};
