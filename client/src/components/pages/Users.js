import React from 'react'
import RegisterForm from '../users/RegisterForm'
import UsersFilter from '../users/UsersFilter'
import UsersList from '../users/UsersList'

const Users = () => {
	return (
		<div className='grid-2'>
			<div>
				<RegisterForm />
			</div>
			<div>
				<UsersFilter />
				<UsersList />
			</div>
		</div>
	)
}

export default Users
