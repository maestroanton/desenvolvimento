import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from '../components/home/Home';
import UserCrud from '../components/users/UserCrud';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register'
import RequireAuth from '../components/auth/RequireAuth';

export default props => {
    return (
	    <Routes>
		    <Route exact path="/" element={<Home />}/>
		    <Route path="/register" element={<Register />}/>
		    <Route path="/login" element={<Login />}/>
		    <Route path="/users" element={<RequireAuth><UserCrud /></RequireAuth>}/>
		    <Route path="*" element={<Home />}/>
	    </Routes>
    )
};


