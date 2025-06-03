module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix',
    'jest --bail --passWithNoTests --findRelatedTests',
  ],
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.css': ['prettier --write'],
}
