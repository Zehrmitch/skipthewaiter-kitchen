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
				<div class='flex items-center pt-12 w-full justify-center'>
					<div class='max-w-lg'>
						<div class='bg-white shadow-xl rounded-lg py-3'>
							<div class='photo-wrapper p-2'>
								<img
									class='w-32 h-32 rounded-full mx-auto'
									src={user.picture}
									alt={user.name}
								/>
							</div>
							<div class='p-2'>
								<h3 class='text-center text-xl text-gray-900 font-medium leading-8'>
									{user.nickname}
								</h3>
								<div class='text-center text-gray-400 text-xs font-semibold'>
									<p>Account Manager</p>
								</div>
								<table class='text-xs my-3'>
									<tbody>
										<tr>
											<td class='px-2 py-2 text-gray-500 font-semibold'>
												Email Address
											</td>
											<td class='px-2 py-2'>
												{user.name}
											</td>
										</tr>
										<tr>
											<td class='px-2 py-2 text-gray-500 font-semibold'>
												Total Purchases
											</td>
											<td class='px-2 py-2'>$17.38</td>
										</tr>
										<tr>
											<td class='px-2 py-2 text-gray-500 font-semibold'>
												Years of operation
											</td>
											<td class='px-2 py-2'>
												2 years 10 months
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default withAuthenticationRequired(Profile, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/profile',
});
