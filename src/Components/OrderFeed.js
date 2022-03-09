import { CheckIcon, XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function OrderFeed() {
	const [loaded, setLoaded] = useState(false);
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		setLoaded(false);
		function getOrder() {
			const storeId = sessionStorage.getItem('storeId');
			const apiUrl = 'http://localhost:8080/api/order/all/' + storeId;
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

	function formatStatus(status) {
		if (status === 'ready') {
			return (
				<div>
					<span
						className={classNames(
							'bg-green-500',
							'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
						)}
					>
						<CheckIcon
							className='h-5 w-5 text-white'
							aria-hidden='true'
						/>
					</span>
				</div>
			);
		} else {
			return (
				<div>
					<span
						className={classNames(
							'bg-red-500',
							'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
						)}
					>
						<XIcon
							className='h-5 w-5 text-white'
							aria-hidden='true'
						/>
					</span>
				</div>
			);
		}
	}

	function formatDate(date) {
		const DT = date.split('T');
		const MYD = DT[0].split('-');
		const T = DT[1].split(':');
		const day = new Date(MYD[0], MYD[1], MYD[2]);
		const month = day.toLocaleString('default', { month: 'long' });
		const result = month + ' ' + MYD[1] + ' @ ' + T[0] + ':' + T[1];
		return result;
	}

	function formatPrice(price) {
		const result = price.toFixed(2);
		return result;
	}

	if (!loaded) {
		const storeId = sessionStorage.getItem('storeId');
		const apiUrl = 'http://localhost:8080/api/order/all/' + storeId;
		axios.get(apiUrl).then(handleResponse);
		return <h1>Loading</h1>;
	} else {
		return (
			<div className='flow-root'>
				<ul role='list' className='-mb-8'>
					{orders.map((order) => (
						<li key={order._id}>
							<div className='relative pb-8'>
								<div className='relative flex space-x-3'>
									<div className='flex'>
										{formatStatus(order.orderPhase)}
									</div>
									<div className='min-w-0 pt-1.5 flex justify-between space-x-4'>
										<div>
											<p className='text-xs text-gray-500'>
												ID:{order._id}
											</p>
											<p className='text-xs text-gray-500'>
												Price:{' '}
												{'$' +
													formatPrice(
														order.totalPrice
													)}
											</p>
											<p className='text-xs text-gray-500'>
												{formatDate(order.timeOfOrder)}
											</p>
										</div>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
