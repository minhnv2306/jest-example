/*
 *
 * JestExample reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOADED_USER } from './constants';

export const initialState = {
	user: {},
};

/* eslint-disable default-case, no-param-reassign */
const jestExampleReducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case DEFAULT_ACTION:
				break;
			case LOADED_USER:
				draft.user = action.user;

				break;
		}
	});

export default jestExampleReducer;
