const path = require('path');
const pkg = require('./package.json');

// entry、output
const destDir = 'build';
const outputDir = path.join(destDir, pkg.version);
const entryDir  = 'assets';

// npm scripts target
const isDev     = process.env.NODE_ENV === 'development';
const isHot     = isDev && !process.env.DISABLED_RELOAD;
const theme     = process.env.THEME;
const version   = pkg.version;
const versionName = 'global_app_version';

module.exports = {
  destDir: destDir,
  outputDir: outputDir,
  entryDir: entryDir,
  isDev: isDev,
  isHot: isHot,
  theme: theme,
  version: version,
  versionName: versionName,
};
