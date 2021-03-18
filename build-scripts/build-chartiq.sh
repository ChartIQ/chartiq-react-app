# Builds the charting library package from your local stx project.
# Then copies and installs the package into the react app.

echo "Create library tarball file" && \
cd ../stx && \
npm run packtgz && \

echo "Copy tarball files from stx" && \
cd ../chartiq-react-app-private && \
cp ../stx/dist/chartiq-*.*.*.tgz ./ && \

echo "Install library" && \
npm uninstall chartiq && \
npm i chartiq-*.*.*.tgz