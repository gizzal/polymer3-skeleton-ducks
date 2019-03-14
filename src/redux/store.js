import {createStore, compose, applyMiddleware, combineReducers} from "redux";

import createSagaMiddleware from "redux-saga";
import {rootSaga} from "./sagas";

import app from "./ducks.js";

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  app
});

export const store = createStore(rootReducer, devCompose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
