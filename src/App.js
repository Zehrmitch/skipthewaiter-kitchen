import Login from './Pages/Login';
import { Route, Routes } from 'react-router-dom';
import Orders from './Pages/Orders';

function App() {
	return (
		<Routes>
			<Route exact path='/' element={<Login />}></Route>
			<Route exact path='/orders' element={<Orders />}></Route>
		</Routes>
	);
}

export default App;
