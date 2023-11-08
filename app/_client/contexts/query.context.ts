'use client';

import 'client-only';

import { QueryClient } from '@tanstack/react-query';
import { createContext } from 'react';

import queryConfig from '../config/query.config';

const queryContext = createContext<QueryClient | undefined>(new QueryClient(queryConfig));

export default queryContext;
