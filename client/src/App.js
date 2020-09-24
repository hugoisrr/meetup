import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as JqueryFunctions from './assets/libs/customJquery'
import Login from './components/pages/Login'
import './App.scss'

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
				<div id='wrapper'>
					<Switch>
						<Route exact path='/' component={Login} />
					</Switch>
				</div>
				<a className='scroll-to-top rounded' href='#page-top'>
					<i className='fas fa-angle-up'></i>
				</a>
			</Fragment>
		</Router>
	)
}

export default App
