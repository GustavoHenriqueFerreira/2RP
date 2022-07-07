import { Component } from 'react';
import React from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import '../../assets/css/login.css';

import img_login from '../../assets/img/img_login.svg';
import google from '../../assets/img/img_google.svg';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            isLoading: false
        };
    };

    // Função que faz a chamada para a API para realiza o login
    efetuaLogin = (event) => {
        // ignora o comportamento padrão do navegador (recarregar a página, por exemplo)
        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        axios.post('http://localhost:5000/api/Login', {
            email: this.state.email,
            senha: this.state.senha
        })

            // recebe todo o conteúdo da resposta da requisição na variável resposta
            .then(resposta => {
                // verifico se o status code dessa resposta é igual a 201
                if (resposta.status === 201) {
                    // se sim, exibe no console do navegador o token do usuário logado,
                    // console.log('Meu token é: ' + resposta.data.token);
                    // salva o valor do token no localStorage
                    localStorage.setItem('usuario-login', resposta.data.token);
                    // e define que a requisição terminou
                    this.setState({ isLoading: false });

                    switch (parseJwt().role) {
                        case '1':
                            window.location.href = "../Geral"
                            console.log(usuarioAutenticado())
                            break;

                        case '2':
                            window.location.href = "../Perfil"
                            console.log(usuarioAutenticado())
                            break;

                        case '3':
                            window.location.href = "../Perfil"
                            console.log(usuarioAutenticado())
                            break;

                        default:
                            window.location.href = "../Perfil"
                            console.log(usuarioAutenticado())
                            break;
                    }
                }
            })

            // Caso haja um erro,
            .catch(() => {
                // define o valor do state erroMensagem com uma mensagem personalizada
                this.setState({ erroMensagem: 'E-mail e/ou senha inválidos!', isLoading: false })
            })
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    };

    render() {
        return (
            <div>
                <body className="login">
                    <main>
                        <section>
                            <div className="container-login">
                                <div>
                                    <img src={img_login} className="img_login-login" alt="imagem de uma médica" />
                                </div>
                                <div className="bloco_login-login">
                                    <h1 className="h1-login">Login</h1>
                                    <div className="posicionamento-login">
                                        <img className="google-login" src={google} alt="Login com o Google" />
                                    </div>
                                    <div className="login_senha-login">
                                        <div>
                                            <form className="botoes-login" onSubmit={this.efetuaLogin}>
                                                <div className="btn_login-login">
                                                    <input className="input_login-login"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.atualizaStateCampo}
                                                        type="text"
                                                        placeholder="Email">
                                                    </input>
                                                </div>
                                                <div className="btn_login-login">
                                                    <input className="input_login-login"
                                                        name="senha"
                                                        value={this.state.senha}
                                                        onChange={this.atualizaStateCampo}
                                                        type="password"
                                                        placeholder="Senha">
                                                    </input>
                                                </div>
                                                {
                                                    // Caso seja true, renderiza o botão desabilitado com o texto 'Loading...'
                                                    this.state.isLoading === true &&
                                                    <button className="btn_acessar-login" type="submit" disabled>
                                                        Loading...
                                                    </button>
                                                }

                                                {
                                                    // Caso seja false, renderiza o botão habilitado com o texto 'Login'
                                                    this.state.isLoading === false &&
                                                    <button
                                                        className="btn_acessar-login"
                                                        type="submit"
                                                        disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}>
                                                        Acessar
                                                    </button>
                                                }
                                            </form>
                                        </div>
                                        <p className="erroMensagem-login">{this.state.erroMensagem}</p>
                                        <a className="mudar_senha-login" href="#">Esqueceu a senha?</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </body>
            </div>
        )
    }
};