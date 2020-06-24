const getAttractionId = (ref) => {
  const url = new URL(ref);
  const path = url.pathname;
  const idSearch = /(\d{3})/;
  const [attractionId] = path.match(idSearch);
  return attractionId;
};

export default getAttractionId;
