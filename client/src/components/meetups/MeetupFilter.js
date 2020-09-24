import React, { useContext, useEffect, useRef } from 'react'
import MeetUpContext from '../../context/meetup/meetUpContext'

const MeetupFilter = () => {
	const meetUpContext = useContext(MeetUpContext)
	const { filterMeetups, clearFilter, filtered } = meetUpContext
	const text = useRef('')

	useEffect(() => {
		if (filtered === null) {
			text.current.value = ''
		}
	})

	const onChange = (e) => {
		if (text.current.value !== '') {
			filterMeetups(e.target.value)
		} else {
			clearFilter()
		}
	}

	return (
		<form>
			<input
				type='text'
				ref={text}
				placeholder='Filter MeetUps...'
				onChange={onChange}
			/>
		</form>
	)
}

export default MeetupFilter
