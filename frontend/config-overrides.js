const path = require('path');

module.exports = function override(config, env) {
  // Add polyfills for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "timers": require.resolve("timers-browserify"),
    "fs": require.resolve("browserify-fs"),
    "path": require.resolve("path-browserify"),
    "net": false, // Set to false if not needed
    "tls": false // Set to false if not needed
  };

  return config;
};