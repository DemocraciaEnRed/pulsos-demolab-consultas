const express = require('express')
const debug = require('debug')
const log = debug('democracyos:ext:api:filters')
const api = require('lib/backend/db-api')
const apiExt = require('ext/lib/db-api')

const app = module.exports = express()

const limit = 10

app.get(
  '/topics/:byWhat/:page',
  function(req, res, next) {
    const options = {
      limit,
      skip: req.params.page * limit
    }

    switch (req.params.byWhat) {
      case 'byClosed':
        log('Filter by closed')
        api.topic.findByClosed(options, (err, topics) => {
          if(err) return next(err)
          return res.json(topics)
        })
        break
      case 'byPopular':
        log('Filter by relevant')
        api.topic.findByPopular(options, (err, topics) => {
          if(err) return next(err)
          return res.json(topics)
        })
        break
      case 'byDate':
        log('Filter by date')
        api.topic.findByDate(options, (err, topics) => {
          if(err) return next(err)
          return res.json(topics)
        })
        break
      default:
        res.sendStatus(404)
    }
  }
)

app.get(
  '/:byWhat/:page',
  function(req, res, next) {
    const options = {
      limit,
      skip: req.params.page * limit
    }

    switch (req.params.byWhat) {
      case 'byClosed':
        log('Filter by closed')
        apiExt.forum.findByClosed(options, (err, forums) => {
          if(err) return next(err)
          return res.json(forums)
        })
        break
      case 'byPopular':
        log('Filter by relevant')
        apiExt.forum.findByPopular(options, (err, forums) => {
          if(err) return next(err)
          return res.json(forums)
        })
        break
      case 'byDate':
        log('Filter by date')
        apiExt.forum.all(options, (err, forums) => {
          if(err) return next(err)
          return res.json(forums)
        })
        break
      default:
        res.sendStatus(404)
    }
  }
)