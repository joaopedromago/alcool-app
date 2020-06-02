require('dotenv').config();
const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const {to} = require('nh-utils');

const firebaseCredencial = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

firebase.initializeApp(firebaseCredencial);
const database = firebase.database();
const countsRef = database.ref('counts');

const application = express();
application.use(cors({origin: true}));

application.get('/getCount', async (_request, response) => {
  const [err, res] = await to(countsRef.once('value'));

  if (err) {
    response.status(500).send(error);
  }

  response.status(200).send(res || []);
});

application.post('/addCount', async (_request, response) => {
  const newUse = {
    date: new Date(),
  };

  const newKey = firebase
    .database()
    .ref()
    .child('counts')
    .push().key;

  const updates = {
    [`/counts/${newKey}`]: newUse,
  };

  await firebase
    .database()
    .ref()
    .update(updates);

  response
    .status(200)
    .send({...newUse, message: 'Your use has been sucessfully registered'});
});

const firebaseApi = functions.https.onRequest(application);

module.exports = {
  firebaseApi,
};
