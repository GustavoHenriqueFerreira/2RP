import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "./Modal.module.css";
import { parseJwt } from '../../services/auth';

const ModalEditar = ({ setIsOpen }) => {
    const [idTipoUsuario, setIdTipoUsuario] = useState(1);
    const [idUsuario, setUsuario] = useState(0);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState(Date);
    const [status, setStatus] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmacaoMensagem, SetMensagem] = useState('');

    function BuscarUsuario() {
        axios('http://localhost:5000/api/UsuarioInfo', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                setUsuario(resposta.data.idUsuario)
            })
            .catch(erro => console.log(erro))
    }

    function Editar(evento) {
        evento.preventDefault();

        SetMensagem('')
        setIsLoading(true);

        axios.put('http://localhost:5000/api/Usuarios/' + idUsuario, {
            idUsuario: idUsuario,
            idTipoUsuario: idTipoUsuario,
            nome: nome,
            email: email,
            senha: senha,
            status: true,
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


    useEffect(BuscarUsuario, []);

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
                            <option value="1"> Ativado</option>
                            <option value="0"> Inativo</option>
                        </select>

                        <input
                            className={styles.input_modal}
                            type="date"
                            name="data"
                            id="data"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />

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

export default ModalEditar;