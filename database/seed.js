// set up languages array:
  // [English, Spanish, Italian, French, Portuguese, German, Chinese, Japanese, Korean]
// set up languages mapped to array of countries object
// set up countries mapped to array of regions object

// set up travelType array:
  // [family, couple, solo, business, friends]

// set up seedData array

// from attractionId 001 through 100...
  // store random number from 20 through 200
  // from 0 through stored random number...
    // create empty object
    // create rating key: store random rating 0 - 5
    // create travelType key: store random type from languages array
    // create expDate key: store random experience date in last 5 years

    // create lang key: store random language from languages array
    // weighted toward English 76%, other languages 3% each

    // create body key: store random body in chosen lang (TODO: use library)
    // create title key: store random title in chosen lang (TODO: use library)
    // create votes key: store random votes number 0 - 1000
    // create createdAt key: store random created date 0 - 3 months after experience date
    // create helpful key: store false
    // create user key: store object
      // user.originCountry key: random from lang-->country object
      // user.originRegion key: random from country-->region object
      // user.contributions key: random from 0 - 1000
      // user.name key: random username (TODO: use library)
      // user.profileImage: (TODO: use library/S3?)
    // create uploadImages key: store array
    // for random number betwen 0 - 3, weighted 75% toward 0...
      // add random image to uploadImages array (TODO: use library/S3?)
    // push finished review object to seedData array
