const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add .riv as a recognized asset extension
config.resolver.assetExts.push("riv");

module.exports = config;
