var path = require('path')
var express = require('express')
var app = express()

var React = require('react')
var ReactDOMServer = require('react-dom/server')

require('babel-core/register')({
  presets: [ 'es2015', 'react' ]
})

app.set('port', (process.env.PORT || 3000))

app.use(express.static(path.join(__dirname, 'dist')))

function renderPage(html, preloadedState) {
  return `
  <!doctype html>
  <html>
    <head>
      <title>React-Redux-SSR</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
   `
}

app.get(['/', '/another-page'], function(req, res) {
  var ReactRouter = require('react-router')
  var match = ReactRouter.match
  var RouterContext = ReactRouter.RouterContext
  var Provider = require('react-redux').Provider
  var routes = require('./src/routes.js').default
  var configureStore = require('./src/store.js').default

  // initialize redux store and retrieve the state for hydration
  const store = configureStore({})
  const preloadedState = store.getState()

  match({routes: routes, location: req.url}, function(error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const html = ReactDOMServer.renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>)
      res.send(renderPage(html, preloadedState))
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
