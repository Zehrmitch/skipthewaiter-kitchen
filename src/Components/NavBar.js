import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useAuth0 } from '@auth0/auth0-react';
import {
	TemplateIcon,
	UserIcon,
	TableIcon,
	EyeIcon,
} from '@heroicons/react/solid';
import AuthenticationButton from './authentication-button';

const tabs = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		id: 0,
		current: false,
	},
	{
		name: 'Order History',
		href: '/history',
		id: 1,
		current: false,
	},
	{
		name: 'Profile',
		href: '/profile',
		id: 2,
		current: false,
	},
	{
		name: 'Menu Builder',
		href: '/menubuilder',
		id: 3,
		current: false,
	},
	{
		name: 'Menu Preview',
		href: '/menupreview',
		id: 4,
		current: false,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

function setId(id) {
	sessionStorage.setItem('id', id);
}

const user = {
	name: 'Whitney Francis',
	email: 'whitneyfrancis@example.com',
};
const userNavigation = [{ name: 'Your Profile', href: '/profile' }];

export default function NavBar() {
	const { logout, user } = useAuth0();

	return (
		<>
			<Disclosure as='nav' className='bg-gray-50'>
				{({ open }) => (
					<>
						<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<div className='relative h-16 flex items-center justify-between border-b border-gray-200'>
								<div className='flex items-center'>
									<div className='flex-shrink-0'>
										<img
											className='h-8 w-auto'
											src='https://s3.us-east-2.amazonaws.com/skipthewaiter.bucket/Resources/Skip+The+Waiter/kitchen-64-bgremoved.png'
											alt='Logo'
										/>
									</div>

									{/* Links section */}
									<div className='hidden lg:block lg:ml-10'>
										<div className='flex space-x-4'>
											{tabs.map((item) => (
												<a
													key={item.name}
													onClick={setId(item.id)}
													href={item.href}
													className={
														(classNames(
															sessionStorage.getItem(
																'id'
															) === item.id
														)
															? 'bg-gray-100'
															: 'hover:text-gray-700',
														'px-3 py-2 rounded-md text-sm font-medium text-gray-900')
													}
													aria-current={
														item.current
															? 'page'
															: undefined
													}
												>
													{item.name}
												</a>
											))}
										</div>
									</div>
								</div>

								{/* Actions section */}
								<div className='hidden lg:block lg:ml-4'>
									<div className='flex items-center'>
										<button
											type='button'
											className='bg-gray-50 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#68C9BA]'
										>
											<span className='sr-only'>
												View notifications
											</span>
										</button>

										{/* Profile dropdown */}
										<Menu
											as='div'
											className='ml-3 relative flex-shrink-0'
										>
											<div>
												<Menu.Button className='bg-gray-50 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#68C9BA]'>
													<span className='sr-only'>
														Open user menu
													</span>
													<img
														className='rounded-full h-8 w-8'
														src={user.picture}
														alt=''
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<Menu.Items className='origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
													{userNavigation.map(
														(item) => (
															<Menu.Item
																key={item.name}
															>
																{({
																	active,
																}) => (
																	<a
																		href={
																			item.href
																		}
																		className={classNames(
																			active
																				? 'bg-gray-100'
																				: '',
																			'block py-2 px-4 text-sm text-gray-700'
																		)}
																	>
																		{
																			item.name
																		}
																	</a>
																)}
															</Menu.Item>
														)
													)}
													<Menu.Item key='logout'>
														{({ active }) => (
															<a
																onClick={() =>
																	logout({
																		returnTo:
																			window
																				.location
																				.origin,
																	})
																}
																className={classNames(
																	active
																		? 'bg-gray-100'
																		: '',
																	'block py-2 px-4 text-sm text-gray-700 cursor-pointer'
																)}
															>
																Sign Out
															</a>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>
							</div>
						</div>

						<Disclosure.Panel className='bg-gray-50 border-b border-gray-200 lg:hidden'>
							<div className='px-2 pt-2 pb-3 space-y-1'>
								{tabs.map((item) => (
									<Disclosure.Button
										key={item.name}
										as='a'
										href={item.href}
										className={
											(sessionStorage.getItem('id') ===
											item.id
												? 'bg-gray-100'
												: 'hover:bg-gray-100',
											'block px-3 py-2 rounded-md font-medium text-gray-900')
										}
										aria-current={
											item.current ? 'page' : undefined
										}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
							<div className='pt-4 pb-3 border-t border-gray-200'>
								<div className='px-5 flex items-center'>
									<div className='flex-shrink-0'>
										<img
											className='rounded-full h-10 w-10'
											src={user.picture}
											alt=''
										/>
									</div>
									<div className='ml-3'>
										<div className='text-base font-medium text-gray-800'>
											{user.name}
										</div>
										<div className='text-sm font-medium text-gray-500'>
											{user.email}
										</div>
									</div>
									<button
										type='button'
										className='ml-auto bg-gray-50 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#68C9BA]'
									>
										<span className='sr-only'>
											View notifications
										</span>
									</button>
								</div>
								<div className='mt-3 px-2 space-y-1'>
									{userNavigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as='a'
											href={item.href}
											className='block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100'
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</>
	);
}
