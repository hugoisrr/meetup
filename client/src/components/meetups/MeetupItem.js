import React, { useContext } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'
import MeetUpContext from '../../context/meetup/meetUpContext'

const MeetupItem = ({ meetup }) => {
	const meetUpContext = useContext(MeetUpContext)
	const { setCurrent } = meetUpContext

	const { title, description, status, createdAt } = meetup

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{title}{' '}
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(status === 'released' ? 'badge-success' : 'badge-primary')
					}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</span>
			</h3>
			<ul className='list'>
				{description && <li>Description: {description}</li>}
				{createdAt && <li>Created: {formatDistance(createdAt, 3)}</li>}
			</ul>
			<p>
				<button
					className='btn btn-dark btn-sm'
					onClick={() => setCurrent(meetup)}
				>
					Edit
				</button>
			</p>
		</div>
	)
}

MeetupItem.propTypes = {
	meetup: PropTypes.object.isRequired,
}

export default MeetupItem
