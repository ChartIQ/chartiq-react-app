echo "Create library tarball file" && \
cd ./stx && \
npm run build && \

echo "Copy tarball files from stx" && \
cd ../ && \
cp ./stx/dist/chartiq-*.*.*.tgz ./ && \

echo "Install library" && \
npm uninstall chartiq && \
npm i chartiq-*.*.*.tgz

echo "Delete installed tarball"
rm chartiq-*.*.*.tgz
