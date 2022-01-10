import { Route, Routes } from 'react-router-dom';
import Orders from './Pages/Orders';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Components/Loading';
import Profile from './Pages/Profile';
import Login from './Pages/Login';

function App() {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Routes>
			<Route exact path='/' element={<Login />}></Route>
			<Route exact path='/dashboard' element={<Orders />}></Route>
			<Route exact path='/profile' element={<Profile />}></Route>
		</Routes>
	);
}

export default App;
