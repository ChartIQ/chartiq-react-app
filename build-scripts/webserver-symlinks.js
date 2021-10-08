const fs = require('fs');
const path = require('path');

const callback = (err) => { if (err) console.log(err) };

createSymlink({
  target: "../node_modules/chartiq/examples",
  symlink: "../dist/examples"
});
createSymlink({
  target: "../node_modules/@chartiq/ui-tests/test-lib",
  symlink: "../dist/test-lib"
});
createSymlink({
  target: "../dist/test-lib/test-rigs-automated",
  symlink: "../dist/test-rigs-automated"
});
// Symlink techical-analysis folder to index.html file so that routes work
// without StaticServer returning a 404 code.
createSymlink({ 
   target: "../dist/index.html",
   symlink: "../dist/technical-analysis",
   isDir: false,
});

function createSymlink({ 
  target,
  symlink,
  isDir = true,
  cb = callback
}) {
  const symlinkPath = path.join(__dirname, ...symlink.split("/"));
  if (fs.existsSync(symlinkPath)) return;
  fs.symlink(
    path.join(__dirname, ...target.split("/")),
    symlinkPath,
    isDir ? 'dir' : 'file',
    cb
  );
}