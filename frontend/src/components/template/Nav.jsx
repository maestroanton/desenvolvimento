import './Nav.css' 
import { Link } from 'react-router-dom'
import React from 'react' 
export default props =>
	<aside className="menu-area">
		<nav className="navbar navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
            aria-label="Navegação.">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
			            <Link to="/" className="nav-link">
			                <i className="fa fa-home"></i> Início
		            	</Link>
		            </li>
		            <li className="nav-item">
			            <Link to ="/register" className="nav-link">
		                	<i className="fa fa-users"></i> Registro
		            	</Link>
		            </li>
  		            <li className="nav-item">
	            		<Link to ="/login" className="nav-link">
    			            <i className="fa fa-users"></i> Login
			            </Link>
			        </li>
		            <li className="nav-item">
            			<Link to="/users" className="nav-link">
			                <i className="fa fa-users"></i> Usuários
		            	</Link>
		            </li>
		        </ul>
            </div>
		</nav>
	</aside>