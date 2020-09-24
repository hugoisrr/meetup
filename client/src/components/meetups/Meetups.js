import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import MeetUpContext from '../../context/meetup/meetUpContext'
import MeetupItem from './MeetupItem'

const Meetups = () => {
	const meetUpContext = useContext(MeetUpContext)

	const { meetups, filtered } = meetUpContext

	if (meetups.length === 0) {
		return <h4>Please add a MeetUp</h4>
	}

	return (
		<Fragment>
			<TransitionGroup>
				{filtered !== null
					? filtered.map((meetup) => (
							<CSSTransition key={meetup.id} timeout={10} classNames='item'>
								<MeetupItem meetup={meetup} />
							</CSSTransition>
					  ))
					: meetups.map((meetup) => (
							<CSSTransition key={meetup.id} timeout={500} classNames='item'>
								<MeetupItem meetup={meetup} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</Fragment>
	)
}

export default Meetups
