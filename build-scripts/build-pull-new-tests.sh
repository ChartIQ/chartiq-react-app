# Builds the charting library package from your local stx project.
# Then copies and installs the package into the react app.

echo "Pull stx repo" && \
cd ../chartiq-react-app-private && \
git clone https://nikcodeit@github.com/ChartIQ/stx.git -b new-tests-package
echo "Pulling done!"