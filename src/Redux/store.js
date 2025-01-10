
import { legacy_createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import userReducer from './Auth/userReducer';

const rootReducer = combineReducers({
    user: userReducer
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export default store;
