import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/nav-bar';
import Orders from './Pages/Orders';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Components/Loading';
import Profile from './Pages/Profile';

function App() {

	return (
		<div>
			<NavBar />
			<Routes>
				<Route exact path='/' element={<Orders />}></Route>
				<Route exact path='/profile' element={<Profile />}></Route>
			</Routes>	
		</div>	
	);
}

export default App;
