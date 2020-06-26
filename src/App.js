import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import RestaurantList from './components/RestaurantList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import reducers from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const App = () => {
  return (
    <Provider store={store}>
      <SearchBar />
      <RestaurantList />
    </Provider>
  );
};

export default App;
