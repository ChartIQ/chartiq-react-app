echo "Create testing tarball file" && \
cd ./stx/spec && \
npm pack && \

echo "Copy tarball files from stx" && \
cd ../../ && \
cp ./stx/spec/chartiq-ui-tests-*.*.*.tgz ./ && \

echo "Install tests" && \
npm i chartiq-ui-tests-*.*.*.tgz