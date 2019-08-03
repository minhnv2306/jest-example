import { defaultAction, loadedUser } from '../actions';
import { DEFAULT_ACTION, LOADED_USER } from '../constants';

describe('JestExample actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('loadedUser', () => {
    it('should return the correct type and the passed repos', () => {
      const user = {
        name: 'MinhNV',
      };
      const expectedResult = {
        type: LOADED_USER,
        user,
      };

      expect(loadedUser(user)).toEqual(expectedResult);
    });
  });
});
