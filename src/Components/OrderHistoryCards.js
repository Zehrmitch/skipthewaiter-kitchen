import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	ArrowNarrowLeftIcon,
	ArrowNarrowRightIcon,
	CheckCircleIcon,
	ChevronRightIcon,
	MailIcon,
} from '@heroicons/react/solid';

export default function OrderCards() {
	const [loaded, setLoaded] = useState(false);
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		setLoaded(false);
	}, []);

	function handleResponse(response) {
		setOrders(response.data);
		setLoaded(true);
	}

	function formatDate(date) {
		const DT = date.split('T');
		const MYD = DT[0].split('-');
		const T = DT[1].split(':');
		const day = new Date(MYD[0], MYD[1], MYD[2]);
		const month = day.toLocaleString('default', { month: 'long' });
		const result = month + ' ' + MYD[1] + ' ' + T[0] + ':' + T[1];
		return result;
	}

	if (!loaded) {
		const storeId = sessionStorage.getItem('storeId');
		const apiUrl = 'http://localhost:8080/api/order/all/' + storeId;
		axios.get(apiUrl).then(handleResponse);
		return <h1>Loading</h1>;
	} else {
		return (
			<div className='min-h-full'>
				<main className='pt-8 pb-16'>
					<div className='max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white/80 p-10 rounded-lg'>
						<div className='px-4 sm:px-0'>
							<h2 className='text-lg font-medium text-gray-900'>
								Previous Orders
							</h2>
						</div>
						<ul
							role='list'
							className='mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0'
						>
							{orders.map((order) => (
								<li key={order._id}>
									<a href='#' className='group block'>
										<div className='flex items-center py-5 px-4 sm:py-6 sm:px-0'>
											<div className='min-w-0 flex-1 flex items-center'>
												<div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
													<div>
														<p className='text-sm font-medium text-purple-600 truncate'>
															{order._id}
														</p>
														<p className='mt-2 flex items-center text-sm text-gray-500'>
															<MailIcon
																className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
																aria-hidden='true'
															/>
															Completed Order
															<span className='truncate'></span>
														</p>
													</div>
													<div className='hidden md:block'>
														<div>
															<p className='text-sm text-gray-900'>
																Order Time{' '}
																<time
																	dateTime={
																		order.timeOfOrder
																	}
																>
																	{formatDate(
																		order.timeOfOrder
																	)}
																</time>
															</p>
															<p className='mt-2 flex items-center text-sm text-gray-500'>
																<CheckCircleIcon
																	className='flex-shrink-0 mr-1.5 h-5 w-5 text-green-400'
																	aria-hidden='true'
																/>
																Paid
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</a>
								</li>
							))}
						</ul>
						<nav
							className='border-t border-gray-200 px-4 flex items-center justify-between sm:px-0'
							aria-label='Pagination'
						>
							<div className='-mt-px w-0 flex-1 flex'>
								<a
									href='#'
									className='border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200'
								>
									<ArrowNarrowLeftIcon
										className='mr-3 h-5 w-5 text-gray-400'
										aria-hidden='true'
									/>
									Previous
								</a>
							</div>
							<div className='hidden md:-mt-px md:flex'>
								<a
									href='#'
									className='border-purple-500 text-purple-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
									aria-current='page'
								>
									1
								</a>
							</div>
							<div className='-mt-px w-0 flex-1 flex justify-end'>
								<a
									href='#'
									className='border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200'
								>
									Next
									<ArrowNarrowRightIcon
										className='ml-3 h-5 w-5 text-gray-400'
										aria-hidden='true'
									/>
								</a>
							</div>
						</nav>
					</div>
				</main>
			</div>
		);
	}
}
