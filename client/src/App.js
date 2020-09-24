import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as JqueryFunctions from './assets/libs/customJquery'
import './App.scss'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const App = () => {
	//Use animation jquery methods
	useEffect(() => {
		JqueryFunctions.toogleSideNavigation()
		JqueryFunctions.menuAccordionsResized()
		JqueryFunctions.preventContentWrapper()
		JqueryFunctions.topButtonAppear()
		JqueryFunctions.smoothScrollingTop()
	})
	return (
		<Router>
			<Fragment>
				<Switch>
					<Route exact path='/' component={Login} />
					<div id='wrapper'>
						<Sidebar />
						<div id='content-wrapper' className='d-flex flex-column'>
							<div id='content'>
								<Navbar />
								<Route exact path='/dashboard' component={Dashboard} />
							</div>
							<Footer />
						</div>
					</div>
				</Switch>
				<a className='scroll-to-top rounded' href='#page-top'>
					<i className='fas fa-angle-up'></i>
				</a>
			</Fragment>
		</Router>
	)
}

export default App
