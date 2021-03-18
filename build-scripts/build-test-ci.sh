echo "Create testing tarball file" && \
cd ./stx/spec && \
npm run prepare && npm pack && \

echo "Copy tarball files from stx" && \
cd ../../ && \
cp ./stx/spec/chartiq-ui-tests-*.*.*.tgz ./ && \

echo "Install tests" && \
npm uninstall selenium-standalone @chartiq/ui-tests && \
npm i chartiq-ui-tests-*.*.*.tgz