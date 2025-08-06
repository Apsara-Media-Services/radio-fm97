import fm97 from './fm97.js';
import fm99 from './fm99.js';

const app = {
  fm97: fm97,
  fm99: fm99,
};

export default {
  ...app[(process.env.NEXT_PUBLIC_APP_TAG as keyof typeof app) ?? 'fm97'],
};
