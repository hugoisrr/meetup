import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import MeetUpUser from './components/pages/MeetUpUser'
import About from './components/pages/About'
import Navbar from './components/layout/Navbar'
import MeetUpState from './context/meetup/MeetUpState'
import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Alerts from './components/layout/Alerts'
import UserState from './context/user/UserState'

const App = () => {
	return (
		<AuthState>
			<AlertState>
				<UserState>
					<MeetUpState>
						<Router>
							<Fragment>
								<Navbar />
								<div className='container'>
									<Alerts />
									<Switch>
										<Route exact path='/' component={Register} />
										<Route exact path='/meetup' component={MeetUpUser} />
										<Route exact path='/about' component={About} />
										<Route exact path='/login' component={Login} />
									</Switch>
								</div>
							</Fragment>
						</Router>
					</MeetUpState>
				</UserState>
			</AlertState>
		</AuthState>
	)
}

export default App
