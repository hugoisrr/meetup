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
				firstName: 'Pancho',
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
				firstName: 'Lupita',
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
		dispatch({ type: CREATE_USER, payload: user })
	}

	return (
		<UserContext.Provider
			value={{
				users: state.users,
				current: state.current,
				filtered: state.filtered,
				createUser,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserState