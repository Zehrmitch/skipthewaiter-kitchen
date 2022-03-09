import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import Loading from '../Components/Loading';
import NavBar from '../Components/NavBar.js';

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();
	const [total, setTotal] = useState(0);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(false);
		getTotal();
	}, []);

	function getTotal() {
		var res = '';
		const storeId = sessionStorage.getItem('storeId');
		axios
			.get('http://localhost:8080/api/order/totalpurchased/' + storeId)
			.then((data) => {
				res = data.data.sumTotalPrice;
				setTotal(res);
				setLoaded(true);
				return res;
			})
			.catch((error) => {
				console.log('error');
			});
		return 'error';
	}

	if (!loaded) {
		getTotal();
		return <h1>Loading</h1>;
	} else {
		return (
			isAuthenticated && (
				<div>
					<NavBar />
					<div className='flex items-center pt-12 w-full justify-center'>
						<div className='max-w-lg'>
							<div className='bg-white shadow-xl rounded-lg py-3'>
								<div className='photo-wrapper p-2'>
									<img
										className='w-32 h-32 rounded-full mx-auto'
										src={user.picture}
										alt={user.name}
									/>
								</div>
								<div className='p-2'>
									<h3 className='text-center text-xl text-gray-900 font-medium leading-8'>
										{user.nickname}
									</h3>
									<div className='text-center text-gray-400 text-xs font-semibold'>
										<p>Account Manager</p>
									</div>
									<table className='text-xs my-3'>
										<tbody>
											<tr>
												<td className='px-2 py-2 text-gray-500 font-semibold'>
													Email Address
												</td>
												<td className='px-2 py-2'>
													{user.name}
												</td>
											</tr>
											<tr>
												<td className='px-2 py-2 text-gray-500 font-semibold'>
													Total Purchases
												</td>
												<td className='px-2 py-2'>
													${total}
												</td>
											</tr>
											<tr>
												<td className='px-2 py-2 text-gray-500 font-semibold'>
													Years of operation
												</td>
												<td className='px-2 py-2'>
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
	}
};
export default withAuthenticationRequired(Profile, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/profile',
});
