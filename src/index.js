import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './Auth/auth0-provider-with-history';



ReactDOM.render(
	<BrowserRouter>
		<Auth0ProviderWithHistory>
			<App />	
		</Auth0ProviderWithHistory>	
	</BrowserRouter>,
	document.getElementById('root')
);
