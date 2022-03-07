import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../../Components/Loading.js';
import NavBar from '../../Components/NavBar.js';
import MenuForm from './MenuForm.js';

const MenuBuilder = () => {
	const { user, isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
			<div>
				<NavBar />
        <MenuForm />
			</div>
		)
	);
};

export default withAuthenticationRequired(MenuBuilder, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/menubuilder',
});
