/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const stats = [
	{
		name: 'Total Orders',
		stat: '71,897',
		previousStat: '70,946',
		change: '12%',
		changeType: 'increase',
	},
	{
		name: 'Avg. Completion Time',
		stat: '2.45 min',
		previousStat: '2.36 min',
		change: '2.02%',
		changeType: 'increase',
	},
	{
		name: 'Avg. Order Cost',
		stat: '$23.92',
		previousStat: '$26.31',
		change: '4.05%',
		changeType: 'decrease',
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function OrderStats() {
	const [averagePrice, setAveragePrice] = useState(0);
	const [averageOrder, setAverageOrder] = useState(0);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(false);
		getAvgPrice();
		getAvgOrder();
	}, []);

	function getAvgPrice() {
		var res = '';
		axios
			.get('http://localhost:8080/api/order/avgorderpricetoday')
			.then((data) => {
				res = data.data.avgTotalPrice;
				console.log('getAvgPrice:', data.data.avgTotalPrice);
				setAveragePrice(res);
				return res;
			});
		return 'error';
	}

	function getAvgOrder() {
		var res = '';
		axios
			.get('http://localhost:8080/api/order/avgorderedtoreadytoday')
			.then((data) => {
				res = data.data.avgCompletionTime;
				console.log('avgCompletionTime:', data.data.avgCompletionTime);
				setAverageOrder(res);
				setLoaded(true);
				return res;
			});
		return 'error';
	}

	if (!loaded) {
		getAvgPrice();
		getAvgOrder();
		return <h1>Loading</h1>;
	} else {
		return (
			<div className='border-8 border-[#68C9BA] rounded-lg'>
				<dl className='grid grid-cols-1 bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x'>
					{stats.map((item) => (
						<div key={item.name} className='px-4 py-5 sm:p-6'>
							<dt className='text-base font-normal text-gray-900'>
								{item.name}
							</dt>
							<dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
								<div className='flex items-baseline text-md font-semibold text-indigo-600'>
									<a>{averagePrice}</a>
									<a>{averageOrder}</a>
									<span className='ml-2 text-sm font-medium text-gray-500'>
										from {item.previousStat}
									</span>
								</div>

								<div
									className={classNames(
										item.changeType === 'increase'
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800',
										'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
									)}
								>
									{item.changeType === 'increase' ? (
										<ArrowSmUpIcon
											className='-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500'
											aria-hidden='true'
										/>
									) : (
										<ArrowSmDownIcon
											className='-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500'
											aria-hidden='true'
										/>
									)}

									<span className='sr-only'>
										{item.changeType === 'increase'
											? 'Increased'
											: 'Decreased'}{' '}
										by
									</span>
									{item.change}
								</div>
							</dd>
						</div>
					))}
				</dl>
			</div>
		);
	}
}
