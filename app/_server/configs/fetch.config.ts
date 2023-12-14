import 'server-only';

import envConfig from '~/_common/configs/env.config';

/**
 * In seconds
 */
export const revalidate = envConfig.__DEV__ ? 0 : 60 * 60 * 24; // 1 day
