# Publishing and Updating

## Publishing
As a scoped npm module this package is not published publically by default. 

In order to publish this package use the default npm commands. When you run `npm publish` it will create a new build, pack the code listed in the files entry of _package.json_, and ship the zip to npm for distrubution. **In order for this to work you must be logged into npm.**


Its is recommended that before you create a release you do a dry run to make sure that everything looks the way you intend. You can do that by adding the dry run flag to publish:
```
npm publish --dry-run
```

By default as a scoped npm module this package WILL NOT be published publically. When it is time for a public release you must use the following command:

```bash
npm publish --access public
```

## Updating Versions

The version of this app should match the ChartIQ library release. If the lastest release of STX is 8.5.0, then we should update the version in package.json to match. If we need to do an out of cycle release (for security audits or some other reason) then we should mark that as a patch release.

## Release Checklist:

Before you publish make sure you have done the following:

- Bump release in version of package.json
- Check any files need to be adjusted in files array of package.json
- Test with `--dry-run` to ensure it looks right


## Unpublishing

If you accidentally make a mistake when you are publishing, you can unpublish either the entire package, or a specific verion. Typically you will probably want to unpublish a specific version instead of an entire package. **Do not delete the entire package unless you have accidentally uploaded a package incorrectly with the wrong name or under the wrong access!**

To unpublish a specific release from the CLI you should run: 
```
npm unpublish @chartiq/react-components@<version> --otp=123456 //substitute your own MFA code
```

If you are looking to delete an entire package from NPM you can delete the package from the "Settings" tab of npm website (available once signed in) or run the following:
```
npm unpublish <package-name> -f --otp=123456 // substitute your own MFA code
```

## Further Info
For more information about publishing see NPM documentation:
- [Publishing Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [Unpublishing Packages](https://docs.npmjs.com/unpublishing-packages-from-the-registry)
- [npm publish CLI (v6) docs](https://docs.npmjs.com/cli/v6/commands/npm-publish)
- [npm unpublish CLI (v6) docs](https://docs.npmjs.com/cli/v6/commands/npm-unpublish)
