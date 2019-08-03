import produce from 'immer';

import jestExampleReducer from '../reducer';
import { loadedUser } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('jestExampleReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      user: {},
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(jestExampleReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadedUser action correctly', () => {
    const user = {
      name: 'MinhNV',
    };
    const expectedResult = produce(state, draft => {
      draft.user = user;
    });

    expect(jestExampleReducer(state, loadedUser(user))).toEqual(expectedResult);
  });
});
