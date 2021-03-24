# ChartIQ React Application

## Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Customization](#customization)
- [Enabling plug-ins](#enabling-plug\-ins)
- [Important notes](#important-notes)
- [Questions and support](#questions-and-support)
- [Contributing to this project](#contributing-to-this-project)


## Overview

The ChartIQ React application is a toolkit of components that enable you to build charting applications in the React framework. The components include everything from a basic chart to a complex, active trader desktop:

- `AdvancedChart` &mdash; Creates a full-featured chart with a fully developed user interface
- `MultiChart` &mdash; Displays two advanced charts on screen simultaneously
- `ActiveTrader` &mdash; Sets up an information-rich desktop for traders who trade frequently
- `TermStructure` &mdash; Creates a full featured term structure chart for working with non &mdash; time series data
- `CustomChart` &mdash; Integrates native React components with ChartIQ W3C-standard web components
- `HelloWorld` &mdash; Creates a basic chart with no user interface as a starting point for your React app

**Note:**

- This application has been designed to simplify the transfer of modules such as `src/chartiq/containers/ActiveTraderWorkstation` to other applications. We don't expect that developers will use the application as is with all modules included. So, to make transferring modules easier, we more or less duplicated resource and service files in each module.

- For an example of creating a chart user interface entirely with native React components, see the [Charting-Library---React-Seed-Project](https://github.com/ChartIQ/Charting-Library---React-Seed-Project) project.

## Requirements

A copy of the ChartIQ library, version 8.2.0 or later.

If you do not have a copy of the library, please contact your account manager or send an email to <info@cosaic.io>.

To get a free trial version of the library, go to the ChartIQ <a href="https://cosaic.io/chartiq-sdk-library-download/" target="_blank">download site</a>.

## Getting started

To implement this project:

1. Clone the repository
2. Extract the contents of your zipped ChartIQ library package
3. Copy the tarball (.tgz file) from the extracted library package into the root of this project
4. Run the following commands from the root of the project:
    - `npm install ./chartiq-x.x.x.tgz` to install the charting library
    - `npm install` to install the rest of the dependencies
    - `npm start` to start up the development server
5. Open your browser to [http://localhost:4002](http://localhost:4002) to load the application

**Note:** When you are upgrading or changing your license, we recommend that you completely remove the old library before reinstalling the new one, for example:

```sh
npm uninstall chartiq
npm install ./chartiq-x.x.x.tgz
```

## Customization

### Web component templates

The JSX in `AdvancedChart`, `CustomChart`, and `ActiveTraderWorkstation` component render methods are collections of ChartIQ's user interface web components. You can customize the chart user interface by adding, removing, or modifying UI components. You can also add your own custom React components.

### Configuration

You can configure a variety of chart features by modifying the configuration object provided to the component definition files of `AdvancedChart`, `CustomChart`, and `ActiveTrader`. Sample configurations are available as `getConfig` and `getCustomConfig` functions in the resources files.

A default configuration is part of the ChartIQ library. See the [Chart Configuration](tutorial-Chart%20Configuration.html) tutorial for all the configuration details.

You can also modify the CSS in the style sheet files associated with `AdvancedChart`, `CustomChart`, and `ActiveTrader`. See the [CSS Overview](https://documentation.chartiq.com/tutorial-CSS%20Overview.html) tutorial for information on customizing the chart look and feel.

### Component customization

ChartIQ web components can be customized by extending the web component classes. Customization code should run at the time the chart and user interface are created; that is, in the `createChartAndUI` method. We recommend keeping all customization code in a single file or folder to simplify library version upgrades.

Here's an example of customizing the `cq-chart-title` component:

```js
// Access the web component classes.
import { CIQ } from 'chartiq/js/componentUI';

// Access the class definition of the web component.
const ChartTitle = CIQ.UI.components('cq-chart-title')[0].classDefinition;

// Extend the web component class.
class CustomChartTitle extends ChartTitle {
    update() {
        // Execute the original method.
        super.update();
        // Update the chart title.
        const { symbol, symbolDisplay } = this.context.stx.chart;
        // If symbolDisplay is available, use it in the document title.
        if (symbolDisplay) {
            document.title = document.title.replace(symbol, symbolDisplay);
        }
    }
}

// Update the web component definition.
CIQ.UI.addComponentDefinition('cq-chart-title', CustomChartTitle);
```

### Component integration

`CustomChart` integrates native React components with ChartIQ's W3C-standard web components.

The `RecentSymbols` component provides an example of wrapping and enhancing a web component with a React component. `RecentSymbols` adds a RECENT tab to the lookup controls created by ChartIQ's `cq-lookup` and `cq-comparison-lookup` web components. The RECENT tab displays a list of recently used financial instrument symbols maintained by the `RecentSymbols` component.

The `ShortcutDialog` component is an example of a React component accessed by a web component. User interaction with a drop-down menu created by a ChartIQ `cq-menu` web component opens the dialog box created by the `ShortcutDialog` component. The dialog box enables users to set shortcut keys on the chart's drawing tools.

## Enabling plug-ins

ChartIQ comes with a variety of plug-ins that add enhanced functionality to charts. The ChartIQ React application comes with the plug-ins built in but not enabled.

**Note:** Plug-ins are optional extras that must be purchased. To determine the plug-ins included in your library, see the *./node_modules/chartiq/plugins* folder.

The application includes the ChartIQ plug-ins as component resources that are enabled by uncommenting the relevant imports in the component resources file.

For example, to enable the Trade from Chart (TFC) plug-in for `AdvancedChart`, uncomment the following lines in the [resources.js](./src/chartiq/containers/AdvancedChart/resources.js) file in the *./src/chartiq/containers/AdvancedChart/* folder:

```js
// import 'chartiq/plugins/tfc/tfc-loader';
// import 'chartiq/plugins/tfc/tfc-demo';

config.plugins = {
    .
    .
    .
    // tfc,
    .
    .
    .
};
```

To enable the Market Depth chart and L2 Heat Map in `AdvancedChart`, uncomment the following lines in [resources.js](./src/chartiq/containers/AdvancedChart/resources.js):

```js
// import 'chartiq/plugins/activetrader/cryptoiq';

// import 'chartiq/examples/feeds/L2_simulator'; /* for use with cryptoiq */

config.plugins = {
    // marketDepth,
    .
    .
    .
};
```

and the following lines in [main.js](./src/main.js):

```js
// import { CIQ } from 'chartiq/js/componentUI';

// CIQ.simulateL2({ stx: chartEngine, onInterval: 1000, onTrade: true });
```

## Important notes

- This application runs only from IP address `127.0.0.1`, hostname `localhost`, or the explicit list of domains set on your ChartIQ license. If you need to bind the webpack development server to a different host, please contact your account manager to have additional domains added to your license.

- If the web component polyfill is not required for supported browsers, the download size can be reduced by removing the polyfill script tag in the *index.html* file.

- As of version 8.0.0 of the charting library, this project no longer supports Internet Explorer 11. Please contact [support@chartiq.com](mailto:support@chartiq.com) for information on using version 7.5.0 of the charting library to enable this project to work with IE 11.

## Questions and support

- Contact our development support team at [support@chartiq.com](mailto:support@chartiq.com).
- See our SDK documentation at https://documentation.chartiq.com.

## Contributing to this project

Fork it and send us a pull request. We'd love to see what you can do with our charting tools in React!