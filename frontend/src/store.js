// connect reducers and middleware in store.js
//createStore - the function used to create the store
//combineReducers -each reducer will handle a pieces of functionalit
// (fetch from back end, product list, request part and success response )
// applyMiddleware - like thunk is a middleware
import { createStore, combineReducers, applyMiddleware } from "redux";
// making requests
import thunk from "redux-thunk";
// to be able to use the redux dev tools
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

// put things to load initally
const initialState = {};

const middleware = [thunk];

// only pass in one store per app but can use combineReducers
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
// this is implemented with a provider the provider comes from react redux
// imported in index.js
