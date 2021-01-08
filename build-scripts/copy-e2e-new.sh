# Builds the charting library package from your local stx project.
# Then copies and installs the package into the react app.

echo "Copying e2e-new tests to react-app" && \
cp -r ../stx/spec/e2e-new/ ../chartiq-react-app-private/
echo "Done!"