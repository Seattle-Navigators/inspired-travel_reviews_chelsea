# Inspired Travel: Reviews Service

Open-source, single-page web application creating a member reviews feed microservice for a service-oriented travel recommendation app.

## System requirements
  - Node 10.20.1
  - npm package manager
  - Nodemon 2.0.4
  - MongoDB 4.2.7

## Seed the database with demo data
  - npm run seed

## Start the application
  - npm install
  - npm run watch || npm run build
  - npm start || npm run startProd
  - Navigate to http://localhost:3004/001/reviewsModule
    - To toggle between tourist attractions, change the requested resource in the URL from 001 to any number between 002 - 100

## Run tests
  - npm test

## API

##### To view the application in the browser
  - **Endpoint:** /:productId/reviewsModule
  - **Method:** GET

##### To get all traveler reviews for a tourist attraction:
  - **Endpoint:** /:productId/api/reviews
  - **Method:** GET
  - **Data:** {}
  - **Success response:**
    - **Condition:** If tourist attraction ID exists and has associated reviews
    - **Status code:** 200 OK
    - **Content:** Array of JSON review objects
  - **Error response:**
    - **Condition:** If tourist attraction ID does not exist or does not have associated reviews
    - **Status code:** 404 NOT FOUND
    - **Content:** N/A

##### To mark or unmark a review as "helpful":
  - **Endpoint:** /:productId/api/reviews/:reviewId
  - **Method:** PATCH
  - **Data:** {}
  - **Success response:**
    - **Condition:** If targeted tourist attraction and review exist
    - **Status code:** 200 OK
    - **Content:** N/A
  - **Error response:**
    - **Condition:** If targeted tourist attraction or review does not exist
    - **Status code:** 404 NOT FOUND
    - **Content:** N/A

##### To mark or unmark an image uploaded as part of a review as "helpful":
  - **Endpoint:** /:productId/api/reviews/:reviewId/:imageId
  - **Method:** PATCH
  - **Data:** {}
  - **Success response:**
    - **Condition:** If targeted tourist attraction, review, and image exist
    - **Status code:** 200 OK
    - **Content:** N/A
  - **Error response:**
    - **Condition:** If targeted tourist attraction, review, or image does not exist
    - **Status code:** 404 NOT FOUND
    - **Content:** N/A
