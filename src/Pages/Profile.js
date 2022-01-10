import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import Loading from '../Components/Loading';
import NavBar from '../Components/NavBar.js';

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
			<div>
				<NavBar />
				<img src={user.picture} alt={user.name} />
				<p>{user.email}</p>
				<JSONPretty data={user} />
				{/* {JSON.stringify(user, null, 2)} */}
			</div>
		)
	);
};

export default withAuthenticationRequired(Profile, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/profile',
});
