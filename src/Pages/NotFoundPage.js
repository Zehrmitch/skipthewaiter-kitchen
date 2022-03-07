import React from 'react';
export default function NotFoundPage(props) {
	return (
		<div className='min-h-screen pt-16 pb-12 flex flex-col bg-[#f8f1de]'>
			<main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex-shrink-0 flex justify-center'>
					<a href='/' className='inline-flex'>
						<span className='sr-only'>Workflow</span>
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
					</a>
				</div>
				<div className='py-16'>
					<div className='text-center'>
						<p className='text-sm font-semibold text-[#68C9BA] uppercase tracking-wide'>
							{props.error}
							404 error
						</p>
						<h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
							Page not found.
						</h1>
						<p className='mt-2 text-base text-gray-500'>
							Sorry, we couldn’t find the page you’re looking for.
						</p>
						<div className='mt-6'>
							<a
								href='/'
								className='text-base font-medium text-[#68C9BA]'
							>
								Go back home
								<span aria-hidden='true'> &rarr;</span>
							</a>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
