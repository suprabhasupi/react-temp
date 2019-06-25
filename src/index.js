// REACT
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import  {BrowserRouter} from 'react-router-dom';
// IMPORT COMMON CSS
// import './App.scss';

// import APP
import App from './app/App.js';
render(
	<BrowserRouter>
  		<App />
  	</BrowserRouter>,
  document.getElementById('app'),
);
