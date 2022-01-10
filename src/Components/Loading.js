import React from 'react';
import loading from '../Assets/loading.svg';

const Loading = () => (
	<div className='spinner mt-64 flex items-center justify-center'>
		<img src={loading} alt='Loading...' />
	</div>
);

export default Loading;
