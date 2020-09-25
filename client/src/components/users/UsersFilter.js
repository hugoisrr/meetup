import React, { useContext, useEffect, useRef } from 'react'
import UserContext from '../../context/user/userContext'

const UsersFilter = () => {
	const userContext = useContext(UserContext)
	const { filterUser, clearFilter, filtered } = userContext
	const text = useRef('')

	useEffect(() => {
		if (filtered === null) {
			text.current.value = ''
		}
	})

	const onChange = (e) => {
		if (text.current.value !== '') {
			filterUser(e.target.value)
		} else {
			clearFilter()
		}
	}

	return (
		<form>
			<input
				type='text'
				ref={text}
				placeholder='Filter Users...'
				onChange={onChange}
			/>
		</form>
	)
}

export default UsersFilter
