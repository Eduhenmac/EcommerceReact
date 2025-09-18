import React from 'react';
import { useState } from 'react';
import './estilo.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { ReactComponent as FaceIcon } from './img/facebook.svg';
import { Link, useNavigate  } from 'react-router-dom';



export default function Login() {

  const [name,setName] = React.useState();
  const [login,setLogin] = React.useState(false);
  const navigate = useNavigate();

  

  const responseGoogle = (credentialResponse) => {
    // credentialResponse.credential contém o JWT do Google
    // Para obter o nome, decodifique o JWT:
    if (credentialResponse.credential) {
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      const nomeGoogle = payload.name || '';
      setName(nomeGoogle);
      setLogin(true);
      localStorage.setItem('usuarioLogado', nomeGoogle);
      navigate('/');
    }
  };

  return (
    <div className="login-central-container">
      <div className="login-box login-central-box">
        <div className="login-title login-central-title">Entrar na loja de Informática</div>
        <div className="login-subtitle login-central-subtitle">entre e se acomode a casa é sua.</div>
        <Link className='link' to="/cadastro">
          <button className="login-btn-criar login-central-btn" > <span style={{marginLeft: '140px'}}>Criar conta</span></button>
        </Link>
        <div className="login-divider login-central-divider">
          <hr className='hrlinha'/> <span className="login-ou">ou</span> <hr className='hrlinha'/>
        </div>
        <div className='login-central-btn'>
          <GoogleOAuthProvider clientId="387824273013-1e3egoft0eje4p4moncppp7n955a9n53.apps.googleusercontent.com">
            <GoogleLogin className="login-central-btn" onSuccess={responseGoogle} onError={responseGoogle} width="500"/>
          </GoogleOAuthProvider>
        </div>
        <button className="login-btn-social login-central-btn" >
          <FaceIcon width={24} height={24} style={{ marginRight: 22, marginLeft: 5 }} />
          <span style={{marginLeft: '70px'}}>Login com o Facebook</span>
        </button>
      </div>
    </div>
  );
}
