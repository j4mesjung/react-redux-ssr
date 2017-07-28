import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import TestPage from './components/TestPage'

const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="another-page" component={TestPage} />
    </Route>
)

export default routes
