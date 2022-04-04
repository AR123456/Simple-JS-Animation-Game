// connect reducers and middleware in store.js
//createStore - the function used to create the store
//combineReducers -each reducer will handle a pieces of funtionality (fetch from back end, product list, request part and success response )
// applyMiddleware - like thunk is a middleware
import { createStore, combineReducers, applyMiddleware } from "redux";
// making reqeusts
import thunk from "redux-thunk";
// to be able to use the redux dev tools
import { composeWithDevTools } from "redux-devtools-extension";
