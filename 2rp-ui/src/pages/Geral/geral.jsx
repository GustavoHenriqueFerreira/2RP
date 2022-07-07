import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import icon_logo from '../../assets/img/icon_logo.svg'
import icon_perfil from '../../assets/img/icon_perfil.svg'
import icon_sair from '../../assets/img/icon_sair.svg'
import icon_email from '../../assets/img/icon_email.svg'
import icon_bolo from '../../assets/img/icon_bolo.svg'
import img_perfil from '../../assets/img/img_perfil.svg'
import icon_editar from '../../assets/img/icon_editar.svg'

import ModalEditar from "../../components/ModalEditar/ModalEditar";

import '../../assets/css/profile.css'

export default function Geral() {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [dataNascimento, setDataNascimento] = useState(Date);
    const [isOpen, setIsOpen] = useState(false);

    function BuscarUsuario() {
        axios('http://localhost:5000/api/UsuarioInfo', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                setNome(resposta.data.nome)
                const cpfInicial = resposta.data.cpf.replace(/[^\d]/g, "")
                setCpf(cpfInicial.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
                setEmail(resposta.data.email)
                setDataNascimento(resposta.data.dataNascimento)
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

    useEffect(BuscarUsuario, [], setTimeout(function(){
        BuscarUsuario();
      }, 15000));

    return (
        <div className='container_tela'>
            <section className='menu_sidebar'>
                <img src={icon_logo} alt="Logo" className='logo' />

                <div className='box_secoes'>
                    <div className='box_perfil' id="menu_perfil">
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

            <section className='conteudo_perfil' id='perfil'>
                <div className='cabecalho'>
                    <h1 className='titulo'>Perfil</h1>
                </div>

                <section className='container_perfil'>

                    <div className='posicionamento_box'>
                        <img src={img_perfil} alt="Foto de Perfil do usuario" className='img_user' />
                        <div className='box_info_usuarios'>
                            <div className='info_editar'>
                                <h2 className='info_titulo'>{nome}</h2>
                                <div className='icons_user'>
                                    {/*  <button className='btn_usuarios'>Adicionar Usuário</button> */}
                                    <img onClick={() => setIsOpen(true)} className='posicionamento_icons' src={icon_editar} alt="Icone de editar informações" />
                                    {isOpen && <ModalEditar setIsOpen={setIsOpen} />}
                                </div>
                            </div>
                            <span className='info_user'>{cpf}</span>
                            <div className='box_icon'>
                                <img className='icon' src={icon_email} alt="Icone de Email" />
                                <span className='info_user'>{email}</span>
                            </div>
                            <div className='box_icon'>
                                <img className='icon' src={icon_bolo} alt="Icone de Aniversario" />
                                <span className='info_user'>{Intl.DateTimeFormat("pt-BR", {
                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                }).format(new Date(dataNascimento))}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}