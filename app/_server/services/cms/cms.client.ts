import { createClient } from '@sanity/client';

import sanityConfig from '~/_server/configs/sanity.config';

const sanityClient = createClient(sanityConfig);

export default sanityClient;
