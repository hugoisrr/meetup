import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Navbar from './components/layout/Navbar'
import MeetUpState from './context/meetup/MeetUpState'

const App = () => {
	return (
		<AuthState>
			<AlertState>
				<MeetUpState>
					<Router>
						<Fragment>
							<Navbar />
							<div className='container'>
								<Switch>
									<Route exact path='/' component={Home} />
									<Route exact path='/about' component={About} />
								</Switch>
							</div>
						</Fragment>
					</Router>
				</MeetUpState>
			</AlertState>
		</AuthState>
	)
}

export default App
