import React, {useEffect} from 'react';
import * as JqueryFunctions from './assets/libs/customJquery'
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
    <div className="App">
      <h1>MeetUp</h1>
    </div>
  );
}

export default App;
