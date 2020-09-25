import React, { useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import UserContext from './userContext'
import UserReducer from './userReducer'
import {
	CREATE_USER,
	UPDATE_USER,
	FILTER_USER,
	SET_CURRENT_USER,
	CLEAR_CURRENT_USER,
	CLEAR_USER_FILTER,
} from '../types'

const UserState = (props) => {
	const initialState = {
		users: [
			{
				id: 1,
				firstName: 'Luis',
				surname: 'Lopez',
				email: 'pancho@email.com',
				password: 'password',
				userRole: 'general',
				status: true,
			},
			{
				id: 2,
				firstName: 'Jose',
				surname: 'Lopez',
				email: 'jose@email.com',
				password: 'password',
				userRole: 'admin',
				status: true,
			},
			{
				id: 3,
				firstName: 'Maria',
				surname: 'Lopez',
				email: 'lupita@email.com',
				password: 'password',
				userRole: 'general',
				status: false,
			},
		],
		current: null,
		filtered: null,
	}

	const [state, dispatch] = useReducer(UserReducer, initialState)

	// Create User
	const createUser = (user) => {
		user.id = uuid()
		user.status = true
		dispatch({ type: CREATE_USER, payload: user })
	}

	// Set current User
	const setCurrentUser = (user) => {
		dispatch({ type: SET_CURRENT_USER, payload: user })
	}

	// Clear current User
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT_USER })
	}

	// Update User
	const updateUser = (user) => {
		dispatch({ type: UPDATE_USER, payload: user })
	}

	// Filter User
	const filterUser = (text) => {
		dispatch({ type: FILTER_USER, payload: text })
	}

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_USER_FILTER })
	}

	return (
		<UserContext.Provider
			value={{
				users: state.users,
				current: state.current,
				filtered: state.filtered,
				createUser,
				setCurrentUser,
				updateUser,
				clearCurrent,
				filterUser,
				clearFilter,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserState
