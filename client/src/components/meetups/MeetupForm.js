import React, { useContext, useEffect, useState } from 'react'
import MeetUpContext from '../../context/meetup/meetUpContext'

const MeetupForm = () => {
	const meetUpContext = useContext(MeetUpContext)

	const { createMeetup, updateMeetup, clearCurrent, current } = meetUpContext

	useEffect(() => {
		if (current !== null) {
			setMeetUp(current)
		} else {
			setMeetUp({
				title: '',
				description: '',
				status: 'draft',
			})
		}
	}, [meetUpContext, current])

	const [meetup, setMeetUp] = useState({
		title: '',
		description: '',
		status: 'draft',
	})

	const { title, description, status } = meetup

	const onChange = (e) =>
		setMeetUp({ ...meetup, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		if (current === null) {
			createMeetup(meetup)
		} else {
			updateMeetup(meetup)
		}
		clearAll()
	}

	const clearAll = () => {
		clearCurrent()
	}

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>
				{current ? 'Edit MeetUp' : 'Create MeetUp'}
			</h2>
			<input
				type='text'
				name='title'
				placeholder='Title'
				value={title}
				onChange={onChange}
				required
			/>
			<input
				type='text'
				name='description'
				value={description}
				placeholder='Description'
				onChange={onChange}
			/>
			<h5>MeetUp Status</h5>
			<input
				type='radio'
				name='status'
				value='draft'
				checked={status === 'draft'}
				onChange={onChange}
			/>{' '}
			Draft{' '}
			<input
				type='radio'
				name='status'
				value='released'
				checked={status === 'released'}
				onChange={onChange}
			/>{' '}
			Released
			<div>
				<input
					type='submit'
					value={current ? 'Update MeetUp' : 'Create MeetUp'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	)
}

export default MeetupForm
