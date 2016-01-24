var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../../app/assets/javascripts/relay/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
