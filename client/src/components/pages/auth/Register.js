import React from 'react'
import RegisterForm from '../../register/RegisterForm'
import Users from '../../register/Users'
import UsersFilter from '../../register/UsersFilter'

const Register = () => {
	return (
		<div className='grid-2'>
			<div>
				<RegisterForm />
			</div>
			<div>
				<UsersFilter />
				<Users />
			</div>
		</div>
	)
}

export default Register
