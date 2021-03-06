import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderStatus from './OrderStatus';

export default function OrderCards() {
	const [loaded, setLoaded] = useState(false);
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		setLoaded(false);
		function getOrder() {
			const storeId = sessionStorage.getItem('storeId');
			const apiUrl =
				'http://localhost:8080/api/order/allinlast12hours/' + storeId;
			axios.get(apiUrl).then(handleResponse);
		}
		getOrder();

		const interval = setInterval(() => getOrder(), 10000);

		return () => {
			console.log('Clear Interval');
			clearInterval(interval);
		};
	}, []);

	function handleResponse(response) {
		setOrders(response.data);
		setLoaded(true);
	}

	if (!loaded) {
		const storeId = sessionStorage.getItem('storeId');
		const apiUrl =
			'http://localhost:8080/api/order/allinlast12hours/' + storeId;
		axios.get(apiUrl).then(handleResponse);
		return <h1>Loading</h1>;
	} else {
		return (
			<ul
				role='list'
				className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
			>
				{orders.map((order) => (
					<li
						key={order._id}
						className='col-span-1 bg-white rounded-lg shadow divide-y flex-1 flex flex-col'
					>
						<div className='w-full h-full items-center justify-between p-6 space-x-6 col-span-1 relative'>
							<div className='flex-1 truncate'>
								<div className='flex items-center space-x-3'>
									<h3 className='text-gray-900 text-xs font-medium truncate'>
										Order #: {order._id}
									</h3>
								</div>
								<ul className='mt-1 text-gray-500 text-sm truncate'>
									Orders:
									{order.orderProducts.map((item) => (
										<li className='ml-2'>-{item}</li>
									))}
								</ul>
							</div>
						</div>
						<h3 className='text-gray-900 rounded-md font-small'>
							<OrderStatus ordering={order} />
						</h3>
					</li>
				))}
			</ul>
		);
	}
}
