import {takeLatest} from "redux-saga/effects";
import {INCREASE_VALUE, DECREASE_VALUE} from "./ducks.js";

export function* rootSaga() {
  yield takeLatest(INCREASE_VALUE, increaseSaga);
  yield takeLatest(DECREASE_VALUE, decreaseSaga);
}

function* increaseSaga() {
  console.log("increaseSaga was called");
}

function* decreaseSaga() {
  console.log("decreaseSaga was called");
}
