echo "Create testing tarball file" && \
cd ./stx/tests && \
npm pack && \

echo "Copy tarball files from stx" && \
cd ../../ && \
cp ./stx/tests/chartiq-ui-tests-*.*.*.tgz ./ && \

echo "Install tests" && \
npm i chartiq-ui-tests-*.*.*.tgz

echo "Delete installed tarball"
rm chartiq-ui-tests-*.*.*.tgz
