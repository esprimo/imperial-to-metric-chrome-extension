module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'react',
  ],
  'rules': {
    // I want to be able to align array items and assignments
    'no-multi-spaces': 0,
    'key-spacing': 0,
    // I makes sense to not always create a new variable atm
    'no-param-reassign': 0,
    // All code is strict
    'strict': 0,
  },
};
