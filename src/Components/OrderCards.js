import { CheckIcon, PlusIcon } from '@heroicons/react/solid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const people = [
	{
		name: 'Jane Cooper',
		title: 'Regional Paradigm Technician',
		role: 'Admin',
		email: 'janecooper@example.com',
		telephone: '+1-202-555-0170',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
	},
	{
		name: 'Jane Cooper',
		title: 'Regional Paradigm Technician',
		role: 'Admin',
		email: 'janecooper@example.com',
		telephone: '+1-202-555-0170',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
	},
	{
		name: 'Jane Cooper',
		title: 'Regional Paradigm Technician',
		role: 'Admin',
		email: 'janecooper@example.com',
		telephone: '+1-202-555-0170',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
	},
	{
		name: 'Jane Cooper',
		title: 'Regional Paradigm Technician',
		role: 'Admin',
		email: 'janecooper@example.com',
		telephone: '+1-202-555-0170',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
	},
	{
		name: 'Jane Cooper',
		title: 'Regional Paradigm Technician',
		role: 'Admin',
		email: 'janecooper@example.com',
		telephone: '+1-202-555-0170',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
	},
	{
		name: 'Jane Cooper',
		title: 'Regional Paradigm Technician',
		role: 'Admin',
		email: 'janecooper@example.com',
		telephone: '+1-202-555-0170',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
	},
	// More people...
];

export default function OrderCards() {
	const [loaded, setLoaded] = useState(false);
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		setLoaded(false);
	}, []);

	function handleResponse(response) {
		setOrders(response);
		setLoaded(true);
	}
	if (!loaded) {
		const apiUrl = `http://localhost:8080/api/order/allincompleteorders`;
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
						className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'
					>
						<div className='w-full flex items-center justify-between p-6 space-x-6'>
							<div className='flex-1 truncate'>
								<div className='flex items-center space-x-3'>
									<h3 className='text-gray-900 text-sm font-medium truncate'>
										{order.price}
									</h3>
									<span className='flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
										{order.tableId}
									</span>
								</div>
								<p className='mt-1 text-gray-500 text-sm truncate'>
									{order.tableId}
								</p>
							</div>
						</div>
						<div>
							<div className='-mt-px flex divide-x divide-gray-200'>
								<div className='w-0 flex-1 flex'>
									<PlusIcon
										className='w-5 h-5 text-gray-400'
										aria-hidden='true'
									/>
									<span className='ml-3'>Start</span>
								</div>
								<div className='-ml-px w-0 flex-1 flex'>
									<CheckIcon
										className='w-5 h-5 text-gray-400'
										aria-hidden='true'
									/>
									<span className='ml-3'>Complete</span>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		);
	}
}
