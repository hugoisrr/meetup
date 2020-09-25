import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import UserContext from '../../context/user/userContext'

const RegisterForm = () => {
	const alertContext = useContext(AlertContext)
	const userContext = useContext(UserContext)

	const { setAlert } = alertContext
	const { createUser, current, clearCurrent } = userContext

	useEffect(() => {
		if (current !== null) {
			setUser(current)
		} else {
			setUser({
				firstName: '',
				surname: '',
				email: '',
				password: '',
				password2: '',
				userRole: 'general',
			})
		}
	}, [userContext, current])

	const [user, setUser] = useState({
		firstName: '',
		surname: '',
		email: '',
		password: '',
		password2: '',
		userRole: 'general',
	})

	const {
		firstName,
		surname,
		email,
		password,
		password2,
		userRole,
		status,
	} = user

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		if (firstName === '' || surname === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger')
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger')
		} else {
			if (current === null) {
				createUser({
					firstName,
					surname,
					email,
					password,
					userRole,
				})
			}
		}
	}

	const clearAll = () => {
		clearCurrent()
	}

	return (
		<form onSubmit={onSubmit}>
			<h2>
				{current ? 'Edit' : 'Register'}{' '}
				<span className='text-primary'>User</span>
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
			{current && <h5>Status: {status ? 'Active' : 'Deactivated'}</h5>}
			<input
				type='submit'
				value={current ? 'Update User' : 'Register User'}
				className='btn btn-primary btn-block'
			/>
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

export default RegisterForm
