import React, { useState } from 'react';
import './estilo.css';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  function handleCadastro(e) {
    e.preventDefault();
    if (!nome || !senha || !confirmarSenha || !email) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não conferem.');
      return;
    }
    // Simula cadastro e login
    localStorage.setItem('usuarioLogado', nome);
    navigate('/');
  }

  return (
    <div className="cadastro-central-container">
      <form className="cadastro-box" onSubmit={handleCadastro}>
        <div className="cadastro-title">Entrar na loja de Informática</div>
        <input
          className="cadastro-input"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          className="cadastro-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="cadastro-input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <input
          className="cadastro-input"
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
        />
        {erro && <div className="cadastro-erro">{erro}</div>}
        <button className="cadastro-btn" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}