import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from 'react-native-dotenv';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const firebaseCredencial = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

firebase.initializeApp(firebaseCredencial);

export default firebase;
