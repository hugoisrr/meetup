import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import UserContext from '../../context/user/userContext'
import UserItem from './UserItem'

const UsersList = () => {
	const userContext = useContext(UserContext)

	const { users, filtered } = userContext

	if (users.length === 0) {
		return <h4>No users added</h4>
	}
	return (
		<Fragment>
			<TransitionGroup>
				{filtered !== null
					? filtered.map((user) => (
							<CSSTransition key={user.id} timeout={10} classNames='item'>
								<UserItem user={user} />
							</CSSTransition>
					  ))
					: users.map((user) => (
							<CSSTransition key={user.id} timeout={500} classNames='item'>
								<UserItem user={user} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</Fragment>
	)
}

export default UsersList
