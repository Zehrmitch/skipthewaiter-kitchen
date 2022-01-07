export default function Login() {
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
								<form
									action='#'
									method='POST'
									className='space-y-6'
								>
									<div>
										<label
											htmlFor='email'
											className='block text-sm font-medium text-gray-700'
										>
											Email address
										</label>
										<div className='mt-1'>
											<input
												id='email'
												name='email'
												type='email'
												autoComplete='email'
												required
												className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F7BA20] focus:border-[#F7BA20] sm:text-sm'
											/>
										</div>
									</div>

									<div className='space-y-1'>
										<label
											htmlFor='password'
											className='block text-sm font-medium text-gray-700'
										>
											Password
										</label>
										<div className='mt-1'>
											<input
												id='password'
												name='password'
												type='password'
												autoComplete='current-password'
												required
												className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F7BA20] focus:border-[#F7BA20] sm:text-sm'
											/>
										</div>
									</div>

									<div className='flex items-center justify-between'>
										<div className='flex items-center'>
											<input
												id='remember-me'
												name='remember-me'
												type='checkbox'
												className='h-4 w-4 text-[#F7BA20] focus:ring-[#F7BA20] border-gray-300 rounded'
											/>
											<label
												htmlFor='remember-me'
												className='ml-2 block text-sm text-gray-900'
											>
												Remember me
											</label>
										</div>

										<div className='text-sm'>
											<a
												href='#'
												className='font-medium text-[#68C9BA] hover:text-[#4d9389]'
											>
												Forgot your password?
											</a>
										</div>
									</div>

									<div>
										<button
											type='submit'
											className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#68C9BA] hover:bg-[#4d9389] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
										>
											Sign in
										</button>
									</div>
								</form>
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
