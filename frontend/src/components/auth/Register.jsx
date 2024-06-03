import React, { useState } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/register', { name, email, password });
            alert('Sucesso.');
        } catch (err) {
            console.error('Erro.', err);
            alert(err);
        }
    };

    return (
        <Main title="Registro de Usuário">
            <div className="form">
                <div className="row">
                    <form onSubmit={handleLogin}>
                        <div className="col-12 col-md-6">
                             <div className="form-group">
                                    <label>Nome</label>
                                    <input
                                    type="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nome..."
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email..."
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Senha..."
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button className="btn btn-primary ml-2" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </Main>
    );
};

export default Login;

