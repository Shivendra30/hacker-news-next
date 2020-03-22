const withOffline = require("next-offline");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
const glob = require("glob");
const path = require("path");

const nextConfig = {
  // generateInDevMode: true
};

// const nextConfig = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Note: we provide webpack above so you should not `require` it
//     // Perform customizations to webpack config
//     // Important: return the modified config
//     config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
//     config.plugins.push(
//       new PurgecssPlugin({
//         paths: glob.sync(`${path.join(__dirname)}/**/*`, { nodir: true })
//       })
//     );
//     return config;
//   },
//   webpackDevMiddleware: config => {
//     // Perform customizations to webpack dev middleware config
//     // Important: return the modified config
//     return config;
//   }
//   // generateInDevMode: true
// };

module.exports = withOffline(withCss(withPurgeCss(nextConfig)));
