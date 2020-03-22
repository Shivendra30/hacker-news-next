const withOffline = require("next-offline");

const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports = withCss(withPurgeCss());
const nextConfig = {
  // generateInDevMode: true
};

module.exports = withCss(withPurgeCss(withOffline(nextConfig)));
