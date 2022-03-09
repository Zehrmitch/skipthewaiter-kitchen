import NavBar from '../Components/NavBar.js';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../Components/Loading';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCards from '../Components/OrderHistoryCards.js';

const History = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState(null);

	async function getOrders() {
		setLoading(true);
		const storeId = sessionStorage.getItem('storeId');
		axios
			.get('http:///localhost:8080/allincompleteorders/' + storeId, {
				headers: {
					// Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setOrders(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	useEffect(() => {
		getOrders();
	}, []);

	if (loading) return <p>Loading</p>;

	return (
		<>
			<NavBar />
			<OrderCards />
		</>
	);
};

export default withAuthenticationRequired(History, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/profile',
});
