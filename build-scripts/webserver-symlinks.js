const fs = require('fs');
const path = require('path');

const callback = (err) => { if (err) console.log(err) };

createSynlink("../node_modules/chartiq/examples", "../dist/examples");
createSynlink("../node_modules/@chartiq/ui-tests/test-lib", "../dist/test-lib");
createSynlink("../node_modules/@chartiq/ui-tests/test-rigs-automated", "../dist/test-rigs-automated");

function createSynlink(target, symlink, cb = callback) {
  const symlinkPath = path.join(__dirname, ...symlink.split("/"));

  if (fs.existsSync(symlinkPath)) return;

  fs.symlink(
    path.join(__dirname, ...target.split("/")),
    symlinkPath,
    'dir',
    cb
  );
}