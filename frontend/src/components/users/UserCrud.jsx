import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Main from '../template/Main';
import axios from 'axios';

const headerProps ={
	icon:'users',
	title:'Usuários',
	substitle:'Cadastro de usuários: adição, exclusão e edição'
}

const baseURL='http://localhost:3001/users'

const initialState={
	user: {name:'', email:'', password:''},
	list:[]
}

export default class UserCrud extends Component {
	state = {...initialState}

	componentWillMount() {
		axios(baseURL).then(resp => {
			this.setState({list:resp.data})
		})
	}

	clear() {
		this.setState ({user: initialState.user})
	}

	save() {
		const user = this.state.user;
    		const method = user._id ? 'put' : 'post';
    		const url = user._id ? `${baseURL}/${user._id}` : baseURL;

    		const { _id, ...userData } = user;

    		axios[method](url, userData).then(resp => {
        	const list = this.getUpdatedList(resp.data);
     		   this.setState({ user: initialState.user, list });
    		});
	}

	getUpdatedList(user, add=true) {
		const list = this.state.list.filter(u => u.id !== user.id)
		if ( user && user.id ) list.unshift(user)
		return list
	}

	updateField(event) {
		const user = {...this.state.user}
		user[event.target.name] = event.target.value
		this.setState({user})
	}

	renderForm(){
		return (
			<div className="form">
			<div className="row">
				<div className="col-12 col-md-6">
					<div className="form-group">
						<label>Nome</label>
							<input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e=>this.updateField(e)} placeholder="Digite o nome..." />
					</div>
				</div>
				<div className="col-12 col-md-6">
					<div className="form-group">
						<label>E-mail</label>
							<input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e=>this.updateField(e)} placeholder="Digite o email..." />
					</div>
				</div>
				<div className="col-12 col-md-6">
                    <div className="form-group">
                	    <label>Senha</label>
                		    <input type="text" className="form-control" name="password" value={this.state.user.password} onChange={e=>this.updateField(e)} placeholder="Digite a senha..." />
                	</div>
                </div>
			</div>

			<div className="row">
				<div className="col-12 d-flex justify-content-end">
					<button className="btn btn-primary"
					onClick={e=> this.save(e)}>
						Salvar
					</button>
					<button className="btn btn-secondary ml-2"
					onClick={e=> this.clear(e)}>
						Cancelar	
					</button>
					<button className="btn btn-danger ml-2"
					onClick={this.clearToken}>
					    Clear Token
					</button>
				</div>
			</div>
			</div>
		)
	}

	load(user) {
		this.setState ({user})
	}

	remove(user) {
 		axios.delete(`${baseURL}/${user._id}`).then(resp => {
    		const list = this.getUpdatedList(user, false);
   		this.setState({ list });
  		});
	}

    clearToken = () => {
        localStorage.removeItem('token');
        window.location.reload()
    };


	renderTable() {
		return (
            <div className="table-responsive">
			    <table className="table mt-3">
			        <thead>
			            <tr>
			                <th> Nome</th>
			                <th> E-mail</th>
			                <th> Senha</th>
			                <th> Ações</th>
			            </tr>
			        </thead>
			        <tbody>
			            {this.renderRows()}
			        </tbody>
		    	</table>
		    </div>
		);
	}

	renderRows() {
		return this.state.list.map(user =>{
		return(
			<tr key={user._id}>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td>{user.password}</td>
			<td>
				<button className="btn btn-warning" onClick={() => this.load(user)}>
					<i className="fa fa-pencil">Alterar</i>
				</button>
				<button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
					<i className= "fa fa-trash">Del</i>
				</button>
			</td>
			</tr>
		)
		})
	}

	render(){
		return(	
			<Main {...headerProps}>
				{this.renderForm()}
				{this.renderTable()}
			</Main>
		)
	}
}
