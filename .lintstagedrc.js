const path = require('path');

const buildEslintCommand = (filenames) =>
  `yarn lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
  '*.{ts,tsx,json,html,md,css}': ['prettier --write'],
};
