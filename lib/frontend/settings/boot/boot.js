import 'native-promise-only'
import page from 'page'
import timeago from 'democracyos-timeago'
import config from 'lib/config/config'

import 'lib/boot/moment'
import 'lib/backend/translations/translations'

/**
 * Register routes aliases
 */

import 'lib/boot/routes'

/**
 * Mount applications.
 */

import 'lib/frontend/analytics'
import 'lib/frontend/header/header'
import 'lib/frontend/error-pages/error-pages'
import 'lib/frontend/settings/settings/settings'
import 'lib/frontend/settings/forum-new/forum-new'
import 'lib/frontend/404/404'

/**
 * Init `timeago` component with parameter locale
 */

timeago('.ago', { lang: config.locale, interval: 1000 })

/**
 * Init page.js
 */

page()

if (config.googleAnalyticsTrackingId) {
  require('democracyos-ga')(config.googleAnalyticsTrackingId)
}
