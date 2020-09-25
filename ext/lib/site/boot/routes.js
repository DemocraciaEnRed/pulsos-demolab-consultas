var urlBuilder = require('lib/backend/url-builder')

module.exports = function (multiForum) {
  var forum = multiForum ? '/:forum' : ''

  urlBuilder.register('site.topic', forum + '/consulta/:id')
  urlBuilder.register('site.stats', 'stats')
  urlBuilder.register('site.help', 'ayuda')
  urlBuilder.register('site.help.article', 'ayuda/:article')
}