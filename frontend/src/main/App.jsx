import {useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Home from '../components/home/Home'
import Routes from './Routes'
import Footer from '../components/template/Footer'

export default props =>	{
    return (
		<BrowserRouter>
			<div className="app">
				<Logo />
				<Nav />
				<Routes />
				<Footer />
			</div>
		</BrowserRouter>		
	);
}


