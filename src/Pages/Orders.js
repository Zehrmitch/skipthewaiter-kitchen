import OrderCards from '../Components/OrderCards.js';
import OrderFeed from '../Components/OrderFeed.js';
import OrderStats from '../Components/OrderStats.js';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../Components/Loading';
import NavBar from '../Components/NavBar.js';

const Orders = () => {
	return (
		<div>
			<NavBar />
			<div className='h-screen grid grid-'>
				<div className='flex md:flex-row flex-col h-full'>
					<div className='basis-1/4 m-6 bg-white rounded-lg shadow divide-gray-200 p-6 overflow-scroll min-w-[250px]'>
						<p className='flex justify-center mt-2 text-lg text-[#68C9BA] font-bold'>
							Incoming Orders
						</p>
						<div className='mt-4'>
							<div className='mt-6 relative'>
								<div
									className='absolute inset-0 flex items-center'
									aria-hidden='true'
								>
									<div className='w-full border-t border-gray-300' />
								</div>
								<div className='relative flex justify-center text-sm'>
									<span className='px-2 bg-white text-gray-500'></span>
								</div>
							</div>
						</div>
						<div className='mt-6'>
							<OrderFeed />
						</div>
					</div>
					<div className='basis-3/4 m-6'>
						<div className='mb-4 '>
							<OrderStats />
						</div>

						<OrderCards />
					</div>
				</div>
			</div>
		</div>
	);
};
export default withAuthenticationRequired(Orders, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/',
});
