/* eslint-disable no-empty */
import { all, fork } from 'redux-saga/effects';

function* bootstrap() {
  try {
    yield all([]);
  } catch (e) {}
}

export default function* () {
  yield fork(bootstrap);
}
