# ChartIQ React Application

## Contents

  - [Overview](#overview)
  - [Requirements](#requirements)
  - [Getting started](#getting-started)
  - [Basic Customization](#basic-customization)
  - [Customization](#customization)
    - [Web component templates](#web-component-templates)
    - [Configuration](#configuration)
    - [Template component customization](#template-component-customization)
    - [Component integration](#component-integration)
  - [Important notes](#important-notes)
  - [Questions and support](#questions-and-support)
  - [Contributing to this project](#contributing-to-this-project)


## Overview

The ChartIQ React application features components that enable you to build charting applications in the React framework. The components include everything from a basic chart to a complex, active trader desktop.

React components in *react-components/src/* (also available from @chartiq/react-components package on npm)

- `Chart (Chart/Core)` — Creates a basic chart with a basic user interface. Use with Core package.
- `AdvancedChart (Chart/Advanced)` — Creates a full-featured chart with a fully developed user interface. Use with Technical Analysis package.
- `ActiveTraderWorkstation (ActiveTrader/Workstation)` &mdash; Sets up an information-rich desktop for traders who trade frequently.
- `TermStructure (CrossSection/Chart)` &mdash; Creates a term structure chart for working with non-time-series data.

Custom implementations in *src/containers/*
- `MultiChart` &mdash; Displays two advanced charts on screen simultaneously.
- `CustomChart` &mdash; Integrates native React components with ChartIQ W3C-standard web components.
- `HelloWorld` &mdash; Creates a basic chart with no user interface as a starting point for your React app.

For an example of creating a chart user interface entirely with native React components, see the [chartiq-react-seed](https://github.com/ChartIQ/chartiq-react-seed) project.

## Requirements

A copy of the ChartIQ library, version 9.0.0 or later.

If you do not have a copy of the library, please contact your account manager or send an email to <info@chartiq.com>.

To obtain an evaluation version of the ChartIQ library, visit our <a href="https://www.spglobal.com/marketintelligence/en/pages/request_follow_up_page" target="_blank">Request Follow Up site</a> to get in contact with us!

## Getting started

To implement this project:

1. Clone the repository.
2. Extract the contents of your zipped ChartIQ library package.
3. Copy the tarball (.tgz file) from the extracted library package into the root of this project.
4. Run the following commands from the root of the project:
    - `npm install ./chartiq-x.x.x.tgz` to install the charting library
    - `npm install` to install the rest of the dependencies
    - `npm start` to start up the development server
5. Open your browser to [http://localhost:4002](http://localhost:4002) to load the application.

**Note:** When you are upgrading or changing your license, we recommend that you completely remove the old library before reinstalling the new one, for example:

```sh
npm uninstall chartiq
npm install ./chartiq-x.x.x.tgz
```

## Basic Customization

For basic component customization, see component documentation at [react-components/README](./react-components/README.md).

## Customization

### Web component templates

The *Template.jsx* files of the `AdvancedChart`, `ActiveTraderWorkstation`, and `TermStructure` components and the `render` method of `CustomChart` contain JSX that is a collection of ChartIQ's user interface web components. You can customize the chart user interface by adding, removing, or modifying UI components. You can also add your own custom React components.

### Configuration

You can configure a variety of chart features by modifying the configuration object provided to the component definition files of `AdvancedChart`, `CustomChart`, `ActiveTrader/Workstation`, and `CrossSection/Chart`. Sample configurations are available as `getConfig` and `getCustomConfig` functions in the resources files.

A default configuration is part of the ChartIQ library. See the [Chart Configuration](tutorial-Chart%20Configuration.html) tutorial for all the configuration details.

### Template component customization

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

The `ShortcutDialog` component is an example of a React component accessed by a web component. User interaction with a dropdown menu created by a ChartIQ `cq-menu` web component opens the dialog box created by the `ShortcutDialog` component. The dialog box enables users to set shortcut keys on the chart's drawing tools.


## Important notes

- This application runs only from IP address `127.0.0.1`, hostname `localhost`, or the explicit list of domains set on your ChartIQ license. If you need to bind the webpack development server to a different host, please contact your account manager to have additional domains added to your license.

- If the web component polyfill is not required for supported browsers, the download size can be reduced by removing the polyfill script tag in the *index.html* file.

- As of version 8.0.0 of the charting library, this project no longer supports Internet Explorer 11. Please contact [support@chartiq.com](mailto:support@chartiq.com) for information on using version 7.5.0 of the charting library to enable this project to work with IE 11.

## Questions and support

- Contact our development support team at [support@chartiq.com](mailto:support@chartiq.com).
- See our SDK documentation at https://documentation.chartiq.com.

## Contributing to this project

Fork it and send us a pull request. We'd love to see what you can do with our charting tools in React!
