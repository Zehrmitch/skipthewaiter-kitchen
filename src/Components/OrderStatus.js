import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckIcon, PlusIcon } from '@heroicons/react/solid';

const OrderStatus = (props) => {
	const [status, setStatus] = useState('Ordered');
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(false);
		setStatus(getStatus());
	}, []);

	const storeID = props.ordering.storeId;
	const tableID = props.ordering.tableId;

	function getStatus() {
		setStatus(props.ordering.orderPhase);
		setLoaded(true);
		return props.ordering.orderPhase;
	}

	function formatStatus() {
		if (status === 'ready') {
			return <a className='bg-green-300 rounded-lg px-2 py-1'>Ready</a>;
		} else if (status === 'started') {
			return (
				<a className='bg-yellow-300 rounded-lg px-2 py-1'>Started</a>
			);
		} else if (status === 'ordered') {
			return (
				<a className='bg-yellow-300 rounded-lg px-2 py-1'>Ordered</a>
			);
		} else {
			return <a className='bg-orange-300 rounded-lg px-2 py-1'>Paid</a>;
		}
	}

	async function handleclickStart() {
		setStatus('started');
		const apiUrl = `http://localhost:8080/api/order/orderstarted/${storeID}/${tableID}`;
		await axios
			.put(apiUrl)
			.then(console.log('Changed'))
			.catch((err) => console.log(err));
	}

	async function handleclickComplete() {
		setStatus('ready');
		const apiUrl = `http://localhost:8080/api/order/orderready/${storeID}/${tableID}`;
		await axios
			.put(apiUrl)
			.then(console.log('Changed'))
			.catch((err) => console.log(err));
	}

	if (!loaded) {
		return <p>Loading</p>;
	} else {
		return (
			<div>
				<div className='text-s font-small lex text-center'>
					{formatStatus()}
				</div>
				<div className='px-2 py-2'>
					<div className='flex justify-between'>
						<div className='px-2 py-2 bg-yellow-200 rounded-lg flex justify-between'>
							<PlusIcon
								className='w-6 h-6 text-gray-400'
								aria-hidden='true'
							/>
							<button className='pl-1' onClick={handleclickStart}>
								Start
							</button>
						</div>
						<div className='px-4 py-2 bg-green-200 rounded-lg flex justify-between'>
							<CheckIcon
								className='w-6 h-6 pl-1 text-gray-400'
								aria-hidden='true'
							/>
							<button
								className='pr-1'
								onClick={handleclickComplete}
							>
								Ready
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default OrderStatus;
