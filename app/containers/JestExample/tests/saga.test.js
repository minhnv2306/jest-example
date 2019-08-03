/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { loadUser } from '../saga';
import { loadedUser } from '../actions';

// const generator = jestExampleSaga();

const user = {
  name: 'MinhNV',
};
describe('jestExampleSaga Saga', () => {
  let loadUserGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    loadUserGenerator = loadUser();

    const selectDescriptor = loadUserGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };
    const putDescriptor = loadUserGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(loadedUser(response, user)));
  });
});
