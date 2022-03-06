import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../../Components/Loading.js'
import NavBar from '../../Components/NavBar.js';



const MenuPreview = () => {
	const { user, isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
			<div>
				<NavBar />
			</div>
		)
	);
};

export default withAuthenticationRequired(MenuPreview, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/menupreview',
});
