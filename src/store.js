import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import categories from './modules/navigation';
import posts from './modules/posts';

const rootReducer = combineReducers({
	categories,
	posts
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
  	applyMiddleware(thunk)
  )
)

export default store;