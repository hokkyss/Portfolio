import '@tanstack/react-start/client-only';

import { getAnalytics } from 'firebase/analytics';
import firebaseApp from './firebase.client';

const firebaseAnalytics = getAnalytics(firebaseApp);

export default firebaseAnalytics;
