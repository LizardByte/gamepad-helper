"use strict";

const packageMetadata = require("./package.json");

function documentationVersion(configured) {
  const hosted = (process.env.READTHEDOCS_VERSION || "").trim();
  if (!hosted) {
    return configured;
  }
  if (/^\d+$/.test(hosted) && /^0(?:\.0)+$/.test(configured)) {
    const parts = configured.split(".");
    parts[parts.length - 1] = hosted;
    return parts.join(".");
  }
  return hosted;
}

module.exports = {
  opts: {
    destination: "_site",
    readme: "README.md",
    recurse: true,
  },
  source: {
    include: ["src"],
    includePattern: String.raw`.+\.js$`,
  },
  templates: {
    dockle: {
      extraJavascript: [
        "https://cdn.jsdelivr.net/npm/@lizardbyte/shared-web@2026.925.2800/dist/crowdin.js",
        "docs/static/js/crowdin.js",
      ],
      extraStylesheets: [
        "https://cdn.jsdelivr.net/npm/@lizardbyte/shared-web@2026.925.2800/dist/crowdin-dockle-css.css",
      ],
      favicon: "docs/static/favicon.ico",
      logo: "https://raw.githubusercontent.com/LizardByte/.github/refs/heads/master/branding/logos/logo.svg",
      projectName: "gamepad-helper",
      projectVersion: documentationVersion(packageMetadata.version),
      targetTitle: "gamepad-helper API",
    },
  },
};
