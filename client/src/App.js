import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import M from 'materialize-css'
import './App.scss'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

const App = () => {
	useEffect(() => {
		M.AutoInit()
	}, [])

	return (
		<AuthState>
			<AlertState>
				<Router>
					<Fragment>
						<Switch></Switch>
					</Fragment>
				</Router>
			</AlertState>
		</AuthState>
	)
}

export default App
