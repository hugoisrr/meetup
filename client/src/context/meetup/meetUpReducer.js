import {
	CREATE_MEETUP,
	UPDATE_MEETUP,
	FILTER_MEETUP,
	SET_CURRENT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
} from '../types'

export default (state, action) => {
	switch (action.type) {
		case CREATE_MEETUP:
			return {
				...state,
				meetups: [...state.meetups, action.payload],
			}
		case UPDATE_MEETUP:
			return {
				...state,
				meetups: state.meetups.map((meetup) =>
					meetup.id === action.payload.id ? action.payload : meetup
				),
			}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			}
		case FILTER_MEETUP:
			return {
				...state,
				filtered: state.meetups.filter((meetup) => {
					const regex = new RegExp(`${action.payload}`, 'gi')
					return meetup.title.match(regex)
				}),
			}
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			}

		default:
			return state
	}
}
