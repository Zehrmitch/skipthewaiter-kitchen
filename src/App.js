import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/nav-bar';
import Orders from './Pages/Orders';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Components/Loading';
import Profile from './Pages/Profile';

function App() {
	let { isAuthenticated }  = useAuth0();

	const { isLoading } = useAuth0();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<div>
				<h3>User is {isAuthenticated ? 'Logged in' : 'Not logged in'}</h3>
			</div>	
			<NavBar />
			<Routes>
				<Route exact path='/' element={<Orders />}></Route>
				<Route exact path='/profile' element={<Profile />}></Route>
			</Routes>
			
		</div>	
	);
}

export default App;
