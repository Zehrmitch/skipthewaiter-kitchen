import React from 'react';
import { useState, useEffect } from 'react';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const product = {
	rating: 4,
	colors: [
		{
			name: 'Washed Black',
			bgColor: 'bg-gray-700',
			selectedColor: 'ring-gray-700',
		},
		{ name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
		{
			name: 'Washed Gray',
			bgColor: 'bg-gray-500',
			selectedColor: 'ring-gray-500',
		},
	],
	details: [
		{
			name: 'Features',
			items: [
				'Multiple strap configurations',
				'Spacious interior with top zip',
				'Leather handle and tabs',
				'Interior dividers',
				'Stainless strap loops',
				'Double stitched construction',
				'Water-resistant',
			],
		},
		// More sections...
	],
};
const people = [
	{
		name: 'Lindsay Walton',
		imageUrl:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
	},
	// More people...
];
const activityItems = [
	{
		id: 1,
		person: people[0],
		project: 'Workcation',
		commit: '2d89f0c8',
		environment: 'production',
		time: '1h',
	},
	{
		id: 2,
		person: people[0],
		project: 'Bunkiebooker',
		commit: '2d89f0c8',
		environment: 'Dev',
		time: '5h',
	},
	{
		id: 3,
		person: people[0],
		project: 'Machine Learning',
		commit: '2d89f0c8',
		environment: 'Local',
		time: '3d',
	},
	// More items...
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function OrderOverview() {
	const [data, setData] = useState(null);
	let { storeId, tableId } = useParams();

	useEffect(() => {
		getOrder();

		return () => {
			setData(null);
		};
	}, []);

	async function getOrder() {
		axios
			.get(
				'http://localhost:8080/api/order/getorder/' +
					storeId +
					'/' +
					tableId
			)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
			})
			.finally(() => {});
	}

	if (data === null) return <p>Loading</p>;

	return (
		<div className='bg-white'>
			<div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
				<div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
					{/* Image gallery */}
					<Tab.Group as='div' className='flex flex-col-reverse'>
						{/* Image selector */}
						<div className='hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none'>
							<Tab.List className='grid grid-cols-4 gap-6'>
								{data.space[0].images.map((img) => (
									<Tab
										key={img.id}
										className='relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50'
									>
										{({ selected }) => (
											<>
												<span className='sr-only'>
													{img.id}
												</span>
												<span className='absolute inset-0 rounded-md overflow-hidden'>
													<img
														src={img.url}
														alt=''
														className='w-full h-full object-center object-cover'
													/>
												</span>
												<span
													className={classNames(
														selected
															? 'ring-yellow-400'
															: 'ring-transparent',
														'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
													)}
													aria-hidden='true'
												/>
											</>
										)}
									</Tab>
								))}
							</Tab.List>
						</div>

						<Tab.Panels className='w-full aspect-w-1 aspect-h-1'>
							{data.space[0].images.map((img) => (
								<Tab.Panel key={img.id}>
									<img
										src={img.url}
										className='w-full h-full object-center object-cover sm:rounded-lg'
									/>
								</Tab.Panel>
							))}
						</Tab.Panels>
					</Tab.Group>

					{/* Product info */}
					<div className='mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0'>
						<h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
							{data.space[0].name}
						</h1>

						<div className='mt-3'>
							<h2 className='sr-only'>Product information</h2>
							<p className='text-3xl text-gray-900'>
								{data.space[0].price}
							</p>
						</div>

						{/* Reviews */}
						<div className='mt-3'>
							<h3 className='sr-only'>Reviews</h3>
							<div className='flex items-center'>
								<a href='#details-heading'>
									<div className='flex items-center'>
										{[0, 1, 2, 3, 4].map((rating) => (
											<StarIcon
												key={rating}
												className={classNames(
													product.rating > rating
														? 'text-yellow-300 hover:text-yellow-400'
														: 'text-gray-300',
													'h-5 w-5 flex-shrink-0'
												)}
												aria-hidden='true'
											/>
										))}
									</div>
								</a>
							</div>
						</div>

						<div className='mt-6'>
							<h3 className='sr-only'>Description</h3>

							<div
								className='text-base text-gray-700 space-y-6'
								dangerouslySetInnerHTML={{
									__html: data.space[0].information,
								}}
							/>
						</div>

						<section
							aria-labelledby='details-heading'
							className='mt-12'
						>
							<h2 id='details-heading' className='sr-only'>
								Additional details
							</h2>

							<div className='border-t divide-y divide-gray-200'>
								{product.details.map((detail) => (
									<Disclosure as='div' key={detail.name}>
										{({ open }) => (
											<>
												<h3>
													<Disclosure.Button className='group relative w-full py-6 flex justify-between items-center text-left'>
														<span
															className={classNames(
																open
																	? 'text-yellow-400'
																	: 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															{detail.name}
														</span>
														<span className='ml-6 flex items-center'>
															{open ? (
																<MinusSmIcon
																	className='block h-6 w-6 text-yellow-300 group-hover:text-yellow-400'
																	aria-hidden='true'
																/>
															) : (
																<PlusSmIcon
																	className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
																	aria-hidden='true'
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as='div'
													className='pb-6 prose prose-sm'
												>
													<ul role='list'>
														{detail.items.map(
															(item) => (
																<li key={item}>
																	• {item}
																</li>
															)
														)}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</div>
						</section>

						<section
							aria-labelledby='details-heading'
							className='mt-6'
						>
							<h2 id='details-heading' className='sr-only'>
								Reviews
							</h2>

							<div className='border-t divide-y divide-gray-200'>
								<Disclosure as='div' key='Review'>
									{({ open }) => (
										<>
											<h3>
												<Disclosure.Button className='group relative w-full py-6 flex justify-between items-center text-left'>
													<span
														className={classNames(
															open
																? 'text-yellow-400'
																: 'text-gray-900',
															'text-sm font-medium'
														)}
													>
														Reviews
													</span>
													<span className='ml-6 flex items-center'>
														{open ? (
															<MinusSmIcon
																className='block h-6 w-6 text-yellow-300 group-hover:text-yellow-400'
																aria-hidden='true'
															/>
														) : (
															<PlusSmIcon
																className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
																aria-hidden='true'
															/>
														)}
													</span>
												</Disclosure.Button>
											</h3>
											<Disclosure.Panel
												as='div'
												className='pb-6 prose prose-sm'
											>
												<ul
													role='list'
													className='divide-y divide-gray-200'
												>
													{activityItems.map(
														(activityItem) => (
															<li
																key={
																	activityItem.id
																}
																className='py-4'
															>
																<div className='flex space-x-3'>
																	<img
																		className='h-6 w-6 rounded-full'
																		src={
																			activityItem
																				.person
																				.imageUrl
																		}
																		alt=''
																	/>
																	<div className='flex-1 space-y-1'>
																		<div className='flex items-center justify-between'>
																			<h3 className='text-sm font-medium'>
																				{
																					activityItem
																						.person
																						.name
																				}
																			</h3>
																			<p className='text-sm text-gray-500'>
																				{
																					activityItem.time
																				}
																			</p>
																		</div>
																		<div className='flex items-center'>
																			<div className='flex items-center'>
																				{[
																					0,
																					1,
																					2,
																					3,
																					4,
																				].map(
																					(
																						rating
																					) => (
																						<div>
																							<StarIcon
																								href='#details-heading'
																								key={
																									rating
																								}
																								className={classNames(
																									product.rating >
																										rating
																										? 'text-yellow-300 hover:text-yellow-400'
																										: 'text-gray-300',
																									'h-5 w-5 flex-shrink-0'
																								)}
																								aria-hidden='true'
																							/>
																						</div>
																					)
																				)}
																				<p className='text-sm text-gray-300'>
																					(
																					{
																						product.rating
																					}

																					)
																				</p>
																			</div>
																		</div>
																		<p className='text-sm text-gray-500'>
																			Deployed{' '}
																			{
																				activityItem.project
																			}{' '}
																			(
																			{
																				activityItem.commit
																			}{' '}
																			in
																			master)
																			to{' '}
																			{
																				activityItem.environment
																			}
																		</p>
																	</div>
																</div>
															</li>
														)
													)}
												</ul>
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
