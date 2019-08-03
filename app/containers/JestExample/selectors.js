import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jestExample state domain
 */

const selectJestExampleDomain = state => state.jestExample || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JestExample
 */

const makeSelectJestExample = () =>
	createSelector(
		selectJestExampleDomain,
		substate => substate,
	);

const makeSelectUser = () =>
	createSelector(
		selectJestExampleDomain,
		jestState => jestState.user,
	);
export default makeSelectJestExample;
export { selectJestExampleDomain, makeSelectUser };
