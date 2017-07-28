import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import configureStore from './store'
import reducer from './reducers/reducer'
import { AppContainer } from 'react-hot-loader';

// for Server-side Rendering
if (typeof(window) == 'undefined') {
  global.window = new Object()
}
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

if(typeof(window) !== 'undefined'){
  render();
}

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default
    render(NewApp)
  });
}
