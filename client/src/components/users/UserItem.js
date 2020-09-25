import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/user/userContext'

const UserItem = ({ user }) => {
	const userContext = useContext(UserContext)
	const { setCurrentUser } = userContext

	const { firstName, surname, email, userRole, status } = user

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{firstName + ' ' + surname}
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(userRole === 'admin' ? 'badge-success' : 'badge-primary')
					}
				>
					{userRole.charAt(0).toUpperCase() + userRole.slice(1)}
				</span>
			</h3>
			<ul className='list'>
				{email && <li>Email: {email}</li>}
				{status ? (
					<li>
						Status: <span className='text-primary'>Active</span>
					</li>
				) : (
					<li>
						Status: <span className='text-danger'>Deactivated</span>
					</li>
				)}
			</ul>
			<p>
				<button className='btn btn-dark btn-sm'>Edit</button>
			</p>
		</div>
	)
}

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
}

export default UserItem
