import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { parseJwt } from '../../services/auth'

import icon_logo from '../../assets/img/icon_logo.svg'
import icon_usuarios from '../../assets/img/icon_usuarios.svg'
import icon_perfil from '../../assets/img/icon_perfil.svg'
import icon_sair from '../../assets/img/icon_sair.svg'
import icon_email from '../../assets/img/icon_email.svg'
import icon_bolo from '../../assets/img/icon_bolo.svg'
import img_perfil from '../../assets/img/img_perfil.svg'
import icon_editar from '../../assets/img/icon_editar.svg'
import icon_excluir from '../../assets/img/icon_excluir.svg'
import padrao from '../../assets/img/padrao.png'


import ModalAdd from "../../components/ModalAdicionar/ModalAdd";
import styles from "../../components/ModalAdicionar/Modal.module.css";

import '../../assets/css/profile.css'
import '../../assets/css/tabela.css'

export default function ProfileEdit() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [idTipoUsuario, setIdTipoUsuario] = useState(0);
    const [idUsuario, setIdUsuario] = useState(0);
    const [nome, setNome] = useState('');
    const [nomeUser, setNomeUser] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState(Date);
    const [emailUser, setEmailUser] = useState('');
    const [cpfUser, setCpfUser] = useState('');
    const [dataNascimentoUser, setDataNascimentoUser] = useState(Date);
    const [status, setStatus] = useState(true);
   
   
    const [isLoading, setIsLoading] = useState(false);
    const [confirmacaoMensagem, SetMensagem] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    function Editar(evento) {
        evento.preventDefault();

        SetMensagem('')
        setIsLoading(true);

        axios.put('http://localhost:5000/api/Usuarios/' + idUsuario, {
            idUsuario: idUsuario,
            idTipoUsuario: idTipoUsuario,
            nome:nome,
            email: email,
            senha: senha,
            status: status,
            dataNascimento: dataNascimento,
            cpf: cpf,
            imagem: null,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 204) {

                    console.log('Cadastrado');
                    setIsLoading(false);
                    SetMensagem('Editado com sucesso!')
                }
            }).then(
               
                BuscarUsuario()

                
            )
    };


    function ListarUsuarios() {
        axios('http://localhost:5000/api/Usuarios', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                setListaUsuarios(resposta.data);
            })
            .catch(erro => console.log(erro))
    }

    function BuscarUsuario() {
        axios('http://localhost:5000/api/UsuarioInfo', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                setNomeUser(resposta.data.nome)
                const cpfInicial = resposta.data.cpf.replace(/[^\d]/g, "")
                setCpfUser(cpfInicial.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
                setEmailUser(resposta.data.email)
                setDataNascimentoUser(resposta.data.dataNascimento)
            }).then(
                formatarCpf()
            )
            .catch(erro => console.log(erro))
    }

    function formatarCpf() {
        //retira os caracteres indesejados...
        setCpf(cpf.replace(/[^\d]/g, ""));

        //realizar a formatação...
        return setCpf(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
    }

    const Excluir = (id) => {
        axios.delete('http://localhost:5000/api/Usuarios/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(() => {
                ListarUsuarios();
            })
            .catch(erro => console.log(erro))
    }

    function atualizar_conteudo() {
        var conteudo = document.getElementById("usuario");
        var conteudo_perfil = document.getElementById("perfil");
        var menu_usuarios = document.getElementById("menu_usuarios");
        var menu_perfil = document.getElementById("menu_perfil");
        conteudo.style.display = "block";
        conteudo_perfil.style.display = "none"
        if (conteudo.style.display === "block") {
            menu_usuarios.style.backgroundColor = "#F8F9FD"
            menu_perfil.style.backgroundColor = "#F2F2F2"
        }
    }

    function atualizar_conteudo_perfil() {
        var conteudo = document.getElementById("usuario");
        var conteudo_perfil = document.getElementById("perfil");
        var menu_usuarios = document.getElementById("menu_usuarios");
        var menu_perfil = document.getElementById("menu_perfil");
        conteudo.style.display = "none";
        conteudo_perfil.style.display = "block"
        if (conteudo_perfil.style.display === "block") {
            menu_usuarios.style.backgroundColor = "#F2F2F2"
            menu_perfil.style.backgroundColor = "#F8F9FD"
        }
    }

    function tabela_usuarios() {
        atualizar_conteudo();
        ListarUsuarios();
    }

     useEffect(BuscarUsuario, [], setTimeout(function () {
        BuscarUsuario();
    }, 15000));
    useEffect(atualizar_conteudo, []);
    useEffect(atualizar_conteudo_perfil, []);

    const ModalEditar = ({ setIsOpen }) => {
        return (
            <>
                <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
                <div className={styles.centered}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>Editar Usuário</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <p>X</p>
                        </button>
                        <div className={styles.modalContent}>
                            <input
                                className={styles.input_modal}
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                            <input
                                className={styles.input_modal}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                className={styles.input_modal}
                                type="password"
                                name="senha"
                                id="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <input
                                className={styles.input_modal}
                                type="text"
                                name="cpf"
                                id="cpf"
                                placeholder="CPF: Ex: 11111111111"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />

                            <select
                                value={status}
                                className={styles.input_modal}
                                onChange={(e) => setStatus(e.target.value)}>
                                <option value="0" disabled> Selecione o Tipo</option>
                                <option value="0"> Ativado</option>
                                <option value="1"> Inativo</option>
                            </select>

                            <input
                                className={styles.input_modal}
                                type="date"
                                name="data"
                                id="data"
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                            />

                            <select
                                className={styles.input_modal}
                                value={idTipoUsuario}
                                onChange={(e) => setIdTipoUsuario(e.target.value)}>
                                <option value="0" disabled> Tipo de Usuário</option>
                                <option value="1">Geral</option>
                                <option value="2">Admin</option>
                                <option value="3">Root</option>
                            </select>

                            {
                                isLoading === true &&
                                <button type="submit" className="btn_cadastrar-CadCon" disabled>Carregando...</button>
                            }
                            <p>{confirmacaoMensagem}</p>
                        </div>
                        <div className={styles.modalActions}>
                            <div className={styles.actionsContainer}>
                                {
                                    isLoading === false &&
                                    <button type="submit"
                                        className={styles.deleteBtn}
                                        onClick={(e) => Editar(e)}>Editar</button>
                                }
                                <button
                                    className={styles.cancelBtn}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className='container_tela'>
            <section className='menu_sidebar'>
                <img src={icon_logo} alt="Logo" className='logo' />

                <div className='box_secoes'>
                    <div className='box_campo' onClick={() => tabela_usuarios()} id="menu_usuarios">
                        <img src={icon_usuarios} alt="Imagem para a tela de usuários" />
                        <span className='nome_secao'>Usuários</span>
                    </div>
                    <div className='box_perfil' onClick={() => atualizar_conteudo_perfil()} id="menu_perfil">
                        <img src={icon_perfil} alt="Imagem para a tela de perfil" />
                        <span className='nome_secao'>Perfil</span>
                    </div>
                </div>

                <div className='box_link'>
                    <Link to='/' className='box_sair' onClick={() => localStorage.removeItem('usuario-login')}>
                        <img src={icon_sair} alt="Imagem para sair da aplicação" />
                        <span className='nome_secao'>Sair</span>
                    </Link>
                </div>
            </section>
            <section className='conteudo' id='usuario'>

                <div className='cabecalho'>
                    <h1 className='titulo'>Usuários</h1>
                    <div>
                        {/*  <button className='btn_usuarios'>Adicionar Usuário</button> */}
                        <button className='btn_usuarios' onClick={() => setIsOpen(true)}>
                            Adicionar Usuário
                        </button>
                        {isOpen && <ModalAdd setIsOpen={setIsOpen} />}
                    </div>

                </div>


                <div class="table-users">
                    <div class="header">Registro</div>

                    <table cellspacing="0">
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th width="230">Ativo</th>
                        </tr>

                        {listaUsuarios.map(item =>
                            <tr key={item.idUsuario}>
                                <td><img className='img_usuario' src={padrao} alt="Imagem do usuário" /></td>
                                <td>{item.nome}</td>
                                <td>{item.email}</td>
                                <td>{item.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>
                                <td>{item.dataNascimento}</td>
                                <div className='posicionamento_ativo'>
                                    {item.status === true && <td>Ativo</td>}
                                    {item.status === false && <td>Inativo</td>}
                                    <div>
                                        <button onClick={() => setIsOpen(true)}>
                                            <img className='img_tabela' onClick={() => setIdUsuario(item.idUsuario)} src={icon_editar} alt="Icone de editar usuário" />
                                        </button>
                                        {isOpen && <ModalEditar setIsOpen={setIsOpen} />}
                                        {parseJwt().role === "3" &&
                                            <img className='img_tabela' onClick={() => Excluir(item.idUsuario)} src={icon_excluir} alt="Icone de deletar usuário" />
                                        }
                                    </div>
                                </div>
                            </tr>
                        )}
                    </table>
                </div>
            </section>

            <section className='conteudo_perfil' id='perfil'>
                <div className='cabecalho'>
                    <h1 className='titulo'>Perfil</h1>
                </div>

                <section className='container_perfil'>

                    <div className='posicionamento_box'>
                        <img src={img_perfil} alt="Foto de Perfil do usuario" className='img_user' />
                        <div className='box_info_usuarios'>
                            <div className='info_editar'>
                                <h2 className='info_titulo'>{nomeUser}</h2>
                                <div className='icons_user'>
                                    <img onClick={() => setIsOpen(true)} className='posicionamento_icons' src={icon_editar} alt="Icone de editar informações" />
                                    {isOpen && <ModalEditar setIsOpen={setIsOpen} />}
                                </div>
                            </div>
                            <span className='info_user'>{cpfUser}</span>
                            <div className='box_icon'>
                                <img className='icon' src={icon_email} alt="Icone de Email" />
                                <span className='info_user'>{emailUser}</span>
                            </div>
                            <div className='box_icon'>
                                <img className='icon' src={icon_bolo} alt="Icone de Aniversario" />
                                <span className='info_user'>{Intl.DateTimeFormat("pt-BR", {
                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                }).format(new Date(dataNascimentoUser))}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}