/*
 *
 * JestExample actions
 *
 */

import { DEFAULT_ACTION, LOAD_USER_SAGA, LOADED_USER } from './constants';

export function defaultAction() {
	return {
		type: DEFAULT_ACTION,
	};
}

export function loadUser() {
	return {
		type: LOAD_USER_SAGA,
	};
}

export function loadedUser(user) {
	return {
		type: LOADED_USER,
		user,
	};
}
