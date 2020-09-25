import {
	CREATE_USER,
	UPDATE_USER,
	FILTER_USER,
	SET_CURRENT_USER,
	CLEAR_CURRENT_USER,
	CLEAR_USER_FILTER,
} from '../types'

export default (state, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				users: [...state.users, action.payload],
			}

		default:
			return state
	}
}
