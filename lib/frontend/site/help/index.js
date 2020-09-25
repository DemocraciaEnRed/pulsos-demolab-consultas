var express = require('express')
var urlBuilder = require('lib/backend/url-builder')
var visibility = require('lib/visibility')

var app = module.exports = express()

app.get(urlBuilder.for('site.help'), visibility, require('lib/frontend/site/layout'))
app.get(urlBuilder.for('site.help.article'), visibility, require('lib/frontend/site/layout'))
