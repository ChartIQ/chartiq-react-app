echo "Unlink stx symlink" && \
unlink stx && \
echo "Creating ./stx/spec dir for correct path from wdio configs" && \
mkdir stx && \
cd ./stx && \
mkdir spec && \
echo "Copying e2e-new folder" && \
cp -R ../../stx/spec/e2e-new ./spec && \
echo "Copying done"
