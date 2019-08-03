import { makeSelectUser } from '../selectors';

describe('selectJestExampleDomain', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });
});

describe('makeSelectUser', () => {
  const userSelector = makeSelectUser();
  it('should select the user', () => {
    const user = {
      name: 'MinhNV',
    };
    const mockedState = {
      jestExample: {
        user,
      },
    };
    expect(userSelector(mockedState)).toEqual(user);
  });
});
