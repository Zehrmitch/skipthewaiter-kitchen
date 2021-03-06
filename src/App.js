import { Route, Routes } from 'react-router-dom';
import Orders from './Pages/Orders';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Components/Loading';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import History from './Pages/History';
import MenuBuilderPage from './Pages/MenuBuilder/MenuBuilderPage';
import MenuPreview from './Pages/MenuBuilder/MenuPreview';
import NotFoundPage from './Pages/NotFoundPage';

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
			<Route exact path='/menupreview' element={<MenuPreview />}></Route>
			<Route exact path='/history' element={<History />}></Route>
			<Route
				exact
				path='/menubuilder'
				element={<MenuBuilderPage />}
			></Route>
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
