import LoginButton from '../Components/login-button';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Navigate } from 'react-router-dom';

export default function Login() {
	const { isAuthenticated } = useAuth0();
	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	} else {
		return (
			<div className='h-screen'>
				<div className='min-h-full flex'>
					<div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#f8f1de]'>
						<div className='mx-auto w-full max-w-sm lg:w-96'>
							<div>
								<div className='flex flex-row justify-between px-6'>
									<img
										className='h-16 w-auto'
										src='https://s3.us-east-2.amazonaws.com/skipthewaiter.bucket/Resources/Skip+The+Waiter/spatula-bgremoved.png'
										alt='Workflow'
									/>
									<img
										className='h-16 w-auto'
										src='https://s3.us-east-2.amazonaws.com/skipthewaiter.bucket/Resources/Skip+The+Waiter/kitchen-bgremoved.png'
										alt='Kitchen'
									/>

									<img
										className='h-16 w-auto'
										src='https://s3.us-east-2.amazonaws.com/skipthewaiter.bucket/Resources/Skip+The+Waiter/spoon-bgremoved.png'
										alt='Workflow'
									/>
								</div>
								<h2 className='text-center mt-6 text-3xl font-extrabold text-gray-900'>
									Sign in to your kitchen
								</h2>
								<p className='flex justify-center mt-2 text-sm text-gray-600'>
									Or&nbsp;
									<a
										href='#'
										className='font-medium text-[#68C9BA] hover:text-[#4d9389]'
									>
										create an account
									</a>
								</p>
							</div>

							<div className='mt-8'>
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

								<div className='mt-6'>
									<div>
										<LoginButton />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='hidden lg:block relative w-0 flex-1'>
						<img
							className='absolute inset-0 h-full w-full object-cover'
							src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
							alt=''
						/>
					</div>
				</div>
			</div>
		);
	}
}
