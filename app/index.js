import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as reducers from './reducers';
import SimpleList from './components/SimpleList';

const createStoreWithMiddleware = applyMiddleware(thunk, logger())(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SimpleList />
      </Provider>
    );
  }
}
