import path from 'path';

const requireContext = require.context('.', false, /^index\.js$/);
const exportObj = {};
requireContext
  .keys()
  .forEach(key => {
    const name = path.basename(key, path.extname(key));
    exportObj[name] = requireContext(key);
  });
export default exportObj;
