import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USER_SAGA } from 'containers/JestExample/constants';
import { loadedUser } from 'containers/JestExample/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* loadUser() {
  const requestURL = `https://jsonplaceholder.typicode.com/todos/1`;

  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(request, requestURL);
    console.log('Hello Saga');
    yield put(loadedUser(user));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
    console.log(1);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadUserFromFakeAPI() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_USER_SAGA, loadUser);
}
