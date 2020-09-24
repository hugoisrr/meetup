import React from 'react'
import MeetupFilter from '../meetups/MeetupFilter'
import MeetupForm from '../meetups/MeetupForm'
import Meetups from '../meetups/Meetups'

const MeetUpUser = () => {
	return (
		<div className='grid-2'>
			<div>
				<MeetupForm />
			</div>
			<div>
				<MeetupFilter />
				<Meetups />
			</div>
		</div>
	)
}

export default MeetUpUser
