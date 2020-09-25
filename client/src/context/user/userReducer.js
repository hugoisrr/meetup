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
		case FILTER_USER:
			return {
				...state,
				filtered: state.users.filter((user) => {
					const regex = new RegExp(`${action.payload}`, 'gi')
					return (
						user.firstName.match(regex) ||
						user.surname.match(regex) ||
						user.email.match(regex)
					)
				}),
			}
		case CLEAR_USER_FILTER:
			return {
				...state,
				filtered: null,
			}

		default:
			return state
	}
}
