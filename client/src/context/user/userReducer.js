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
		case UPDATE_USER:
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.payload.id ? action.payload : user
				),
			}
		case SET_CURRENT_USER:
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_CURRENT_USER:
			return {
				...state,
				current: null,
			}

		default:
			return state
	}
}
