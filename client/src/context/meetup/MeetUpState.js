import React, { useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import MeetUpContext from './meetUpContext'
import meetUpReducer from './meetUpReducer'
import {
	CREATE_MEETUP,
	UPDATE_MEETUP,
	FILTER_MEETUP,
	SET_CURRENT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
} from '../types'

const MeetUpState = (props) => {
	const initialState = {
		meetups: [
			{
				id: 1,
				title: 'MeetUp-1',
				description: 'asdfhlkj',
				status: 'draft',
				createdAt: 628021800000,
			},
			{
				id: 2,
				title: 'MeetUp-2',
				description: 'aserfdfhlkj',
				status: 'released',
				createdAt: 628021800000,
			},
			{
				id: 3,
				title: 'MeetUp-3',
				description: 'aserwterdfhlkj',
				status: 'draft',
				createdAt: 628021800000,
			},
		],
		current: null,
		filtered: null,
	}

	const [state, dispatch] = useReducer(meetUpReducer, initialState)

	// Create MeetUp
	const createMeetup = (meetup) => {
		meetup.id = uuid()
		meetup.createdAt = 628021800000
		dispatch({ type: CREATE_MEETUP, payload: meetup })
	}

	// Set current MeetUp
	const setCurrent = (meetup) => {
		dispatch({ type: SET_CURRENT, payload: meetup })
	}

	// Clear current MeetUp
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT })
	}

	// Update MeetUp
	const updateMeetup = (meetup) => {
		dispatch({ type: UPDATE_MEETUP, payload: meetup })
	}

	// Filter MeetUp
	const filterMeetups = (text) => {
		dispatch({ type: FILTER_MEETUP, payload: text })
	}

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER })
	}

	return (
		<MeetUpContext.Provider
			value={{
				meetups: state.meetups,
				current: state.current,
				filtered: state.filtered,
				createMeetup,
				updateMeetup,
				setCurrent,
				clearCurrent,
				filterMeetups,
				clearFilter,
			}}
		>
			{props.children}
		</MeetUpContext.Provider>
	)
}

export default MeetUpState
