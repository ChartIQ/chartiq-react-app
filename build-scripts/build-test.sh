# Builds the test package from your local stx project.
# Then copies and installs the package into the react app.

echo "Create testing tarball file" && \
cd ../stx/spec && \
npm run prepare && npm pack && \

echo "Copy tarball files from stx" && \
cd ../../chartiq-react-app-private && \
cp ../stx/spec/chartiq-ui-tests-*.*.*.tgz ./ && \

echo "Install tests" && \
npm uninstall selenium-standalone @chartiq/ui-tests && \
npm i chartiq-ui-tests-*.*.*.tgz