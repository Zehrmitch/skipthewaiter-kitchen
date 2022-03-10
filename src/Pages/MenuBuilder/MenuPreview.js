import React, { useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../../Components/Loading.js';
import NavBar from '../../Components/NavBar.js';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { findByLabelText } from '@testing-library/react';

const MenuPreview = () => {
	const { user, isAuthenticated } = useAuth0();
	const [loaded, setLoaded] = useState(false);
	const storeId = sessionStorage.getItem('storeId');
	const [inputFields, setInputFields] = useState([
		{
			_id: '',
			productName: '',
			productPrice: '',
			productImageUrl: '',
			productDescription: '',
			storeId: storeId,
		},
	]);

	if (!loaded) {
		const apiUrl = 'http://localhost:8080/api/product/all/' + storeId;
		axios.get(apiUrl).then((response) => {
			if (response && response.data) {
				setInputFields(response.data);
				setLoaded(true);
			}
		});
	}
	const divStyle1 = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-betwwen',
		flexDirection: 'column',
		borderRadius: '20px',
		border: '1px solid lightblue',
		height: '100%',
	};
	const imgStyle = {
		maxHeight: '200px',
		objectFit: 'cover',
		borderRaidus: '20px 20px 0 0',
	};
	const divStyle2 = {
		fontFamily: 'Arial,Helvetica,sans-serif',
		padding: '1rem',
		height: '100%',
	};
	const divStyle3 = {
		margin: '40px',
	};

	return (
		isAuthenticated && (
			<>
				<NavBar />
				<div style={divStyle3}>
					<Grid container spacing={3}>
						{inputFields?.map((item) => (
							<Grid item key={item._id} xs={12} sm={4}>
								<div style={divStyle1} className='bg-white/70'>
									<img
										style={imgStyle}
										src={item.productImageUrl}
										alt={item.productName}
										className='rounded-t-2xl'
									/>
									<div style={divStyle2}>
										<h3 className='font-semibold'>
											{item.productName}
										</h3>
										<p>{item.productDescription}</p>
										<h3>${item.productPrice}</h3>
									</div>
								</div>
							</Grid>
						))}
					</Grid>
				</div>
			</>
		)
	);
};

export default withAuthenticationRequired(MenuPreview, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/menupreview',
});
