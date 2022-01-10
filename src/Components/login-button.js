import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	return (
		<button
			type='submit'
			className='w-full flex justify-center py-8 px-2 border border-transparent rounded-md shadow-md text-xl font-semibold text-white bg-[#68C9BA] hover:bg-[#4d9389] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
			onClick={() => loginWithRedirect()}
		>
			Sign in
		</button>
	);
};

export default LoginButton;
