import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import rootSagas from './sagas';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSagas);
export default store;
