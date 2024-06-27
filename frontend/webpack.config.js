const path = require('path');

module.exports = {
  // Your existing webpack configuration
  resolve: {
    fallback: {
      ...otherFallbacks, // Include any other fallbacks you have
      "vm": false  // Exclude polyfill for the 'vm' module
    }
  },
  // Other webpack settings
};