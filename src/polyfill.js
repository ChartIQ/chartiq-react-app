/**
 * Alternative entry point for webpack, used in build:polyfill npm script. See webpack.config.js file in this project. 
 * 
 * Import for legacy browser polyfills.
 *
 */
import '@babel/polyfill'
import './main';