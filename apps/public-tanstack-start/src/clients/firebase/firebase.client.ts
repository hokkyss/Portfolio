import '@tanstack/react-start/client-only';

import { initializeApp } from 'firebase/app';
import getEnv from '../../configs/env/env.config';

const env = getEnv();

const firebaseApp = initializeApp({
  apiKey: env.firebaseApiKey,
  appId: env.firebaseAppId,
  authDomain: env.firebaseAuthDomain,
  databaseURL: env.firebaseDatabaseUrl,
  measurementId: env.firebaseMeasurementId,
  messagingSenderId: env.firebaseMessagingSenderId,
  projectId: env.firebaseProjectId,
  storageBucket: env.firebaseStorageBucket,
});

export default firebaseApp;
