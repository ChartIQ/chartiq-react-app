# Builds the charting library package from your local stx project.
# Then copies and installs the package into the react app.

echo "Pull stx repo" && \
git clone https://github.com/ChartIQ/stx -b new-tests-package
echo "Pulling done!"