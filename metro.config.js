const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Firebase JS SDK ve Hermes ile uyumluluk için bu ayarları ekleyin
// "Component auth has not been registered yet" hatasını çözer
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: "./global.css" });
