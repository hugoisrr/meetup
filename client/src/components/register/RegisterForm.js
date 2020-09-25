import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const RegisterForm = () => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)

	const { setAlert } = alertContext
	const { register, error, clearErrors } = authContext

	useEffect(() => {
		if (error === 'User already exists') {
			setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error])

	const [user, setUser] = useState({
		firstName: '',
		surname: '',
		email: '',
		password: '',
		password2: '',
		userRole: 'general',
	})

	const { firstName, surname, email, password, password2, userRole } = user

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		if (firstName === '' || surname === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger')
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger')
		} else {
			register({
				firstName,
				surname,
				email,
				password,
				userRole,
			})
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<h2>
				Register <span className='text-primary'>User</span>
			</h2>
			<input
				type='text'
				name='firstName'
				placeholder='First Name'
				value={firstName}
				onChange={onChange}
				required
			/>
			<input
				type='text'
				name='surname'
				placeholder='Surname'
				value={surname}
				onChange={onChange}
				required
			/>
			<input
				type='email'
				name='email'
				placeholder='Email'
				value={email}
				onChange={onChange}
				required
			/>
			<input
				type='password'
				name='password'
				placeholder='Password'
				value={password}
				onChange={onChange}
				required
				minLength='6'
			/>
			<input
				type='password'
				name='password2'
				placeholder='Confirm Password'
				value={password2}
				onChange={onChange}
				required
				minLength='6'
			/>
			<h5>User Role</h5>
			<input
				type='radio'
				name='userRole'
				value='general'
				checked={userRole === 'general'}
				onChange={onChange}
			/>{' '}
			General{' '}
			<input
				type='radio'
				name='userRole'
				value='admin'
				checked={userRole === 'admin'}
				onChange={onChange}
			/>{' '}
			Admin
			<input
				type='submit'
				value='Register'
				className='btn btn-primary btn-block'
			/>
		</form>
	)
}

export default RegisterForm
