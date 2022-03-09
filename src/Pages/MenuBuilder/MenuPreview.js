import React, { useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../../Components/Loading.js'
import NavBar from '../../Components/NavBar.js';
import axios from 'axios';



const MenuPreview = () => {
	const { user, isAuthenticated } = useAuth0();
	const [loaded, setLoaded] = useState(false);
	const storeId = sessionStorage.getItem('storeId');
	const [inputFields, setInputFields] = useState([
		{_id:'', productName: '', productPrice: '', productImageUrl: '', productDescription: '', storeId: storeId },
	]);
	
	if (!loaded) {
		const apiUrl =
			'http://localhost:8080/api/product/all/' + storeId;
		axios.get(apiUrl).then(response => {
			if(response && response.data){
				setInputFields(response.data);
				setLoaded(true);
		}});
	}	

	return (
		isAuthenticated && (
			<div>
				<NavBar />
			</div>
		)
	);
};

export default withAuthenticationRequired(MenuPreview, {
	onRedirecting: () => <Loading />,
	returnTo: () => '/menupreview',
});
