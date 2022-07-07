import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "./Modal.module.css";
import { parseJwt} from '../../services/auth'; 

const ModalAdd = ({ setIsOpen }) => {
    const [idTipoUsuario, setIdTipoUsuario] = useState(1);
    const [nome, setNome] = useState('saulo');
    const [senha, setSenha] = useState('saulo123');
    const [email, setEmail] = useState('salo@2rp.com');
    const [cpf, setCpf] = useState('12433535325554');
    const [dataNascimento, setDataNascimento] = useState('11/11/2000');
    const [status, setStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [confirmacaoMensagem, SetMensagem] = useState('');

    function Cadastrar(evento) {
        evento.preventDefault();

        SetMensagem('')
        setIsLoading(true);
        if (status == "Ativo") {
            setStatus(true)
        } else {
            setStatus(false)
        }

        axios.post('http://localhost:5000/api/Usuarios', {
            idTipoUsuario: idTipoUsuario,
            nome: nome,
            senha: senha,
            email: email,
            cpf: cpf,
            dataNascimento: dataNascimento,
            status: status
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {

                    console.log('Cadastrado');
                    setIsLoading(false);
                    SetMensagem('Cadastrado com sucesso!')
                }
            })

            .catch(erro => console.log(erro),
                setIsLoading(false),
                SetMensagem('Não foi possível realizar o cadastro!')
            );
    };

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Adicionar usuário</h5>
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

                        {/* <input
                            className={styles.input_modal}
                            type="text"
                            name="status"
                            id="status"
                            placeholder="Status: Ativo ou Inativo"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        /> */}
                        <select
                            value={idTipoUsuario}
                            className={styles.input_modal}
                            onChange={(e) => setIdTipoUsuario(e.target.value)}>
                            <option value="0" disabled> Selecione o Tipo</option>
                            <option value="1"> Geral</option>
                            {parseJwt().role === '1' ? (<div></div>) : (<option value="2"> Admin</option>)}
                            {parseJwt().role === '1' || parseJwt().role === '2' ? (<div></div>) : (<option value="3"> Root</option>)}
                        </select>

                        <select
                            value={status}
                            className={styles.input_modal}
                            onChange={(e) => { e.target.value === "1" ? setStatus(true) : setStatus(false) }}>
                            <option value="0" disabled> Selecione o Tipo</option>
                            <option value="1"> Ativado</option>
                            <option value="2"> Inativo</option>
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
                                    onClick={(e) => Cadastrar(e)}>Cadastrar</button>
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

export default ModalAdd;