import '@tanstack/react-start/client-only';

import { getPerformance } from 'firebase/performance';
import firebaseApp from './firebase.client';

const firebasePerformance = getPerformance(firebaseApp);

export default firebasePerformance;
