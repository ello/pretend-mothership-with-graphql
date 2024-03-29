// This file is used in production to server generated JS assets.
// In development mode we use the Webpack Dev server
// to provide assets.  This allows for hot reloading of
// the JS and CSS.

// These helpers are used here: app/views/layouts/application.html.erb

// These assets are located in app/assets/webpack directory
// CRITICAL that webpack/vendor-bundle must be BEFORE turbolinks
// since it is exposing jQuery and jQuery-ujs
//= require vendor-bundle
//= require app-bundle

// Non-webpack assets incl turbolinks
//= require application_non_webpack
