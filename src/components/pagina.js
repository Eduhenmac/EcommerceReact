import React from 'react';
import { useState } from 'react';
import './estilo.css';
import { Link } from 'react-router-dom';

import { ReactComponent as BagIcon } from './img/bag.svg';
import { ReactComponent as PessoaIcon } from './img/pessoa.svg';
import { ReactComponent as LixeiraIcon } from './img/lixeira.svg';

// Importando imagens JPEG
import Proc1 from './img/processador.jpg';
import Proc2 from './img/processador2.jpg';
import Memo from './img/memo.jpg';
import Micro from './img/micro.jpg';
import Moni from './img/monitor.jpg';
import Note from './img/note.jpg';
import Vga  from './img/vga.jpg';
import Water from './img/water.jpg';
// Adicione outros JPEGs conforme necessário
// Banners
import Banner1 from './img/banner1.jpg';
import Banner2 from './img/banner2.jpg';
import Banner3 from './img/banner3.jpg';
// Adicione outros banners conforme necessário  

// Importando Carousel do Bootstrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const produtos = [
  { nome: 'PROCESSADOR INTEL', img: Proc1, preco: 1200.00 },
  { nome: 'PROCESSADOR AMD', img: Proc2, preco: 1100.00 },
  { nome: 'MEMÓRIA RAM', img: Memo, preco: 350.00 },
  { nome: 'MICROFONE', img: Micro, preco: 180.00 },
  { nome: 'MONITOR', img: Moni, preco: 950.00 },
  { nome: 'NOTEBOOK', img: Note, preco: 2800.00 },
  { nome: 'PLACA DE VÍDEO', img: Vga, preco: 2200.00 },
  { nome: 'WATER COOLER', img: Water, preco: 400.00 },
];

export default function Pagina() {
     const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [usuario, setUsuario] = useState(localStorage.getItem('usuarioLogado') || '');
 const [pedidoFeito, setPedidoFeito] = useState(false);

  function adicionarAoCarrinho(produto) {
    setCarrinhoAberto(true);
    setCarrinho((prev) => {
      const idx = prev.findIndex(item => item.nome === produto.nome);
      if (idx !== -1) {
        // Já existe, aumenta quantidade
        const novo = [...prev];
        novo[idx].quantidade += 1;
        return novo;
      }
      // Novo produto
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

 function handleComprar() {
  setPedidoFeito(true);
  setCarrinho([]); // Limpa todos os itens do carrinho
  setTimeout(() => setPedidoFeito(false), 2000); // some após 2 segundos
}

  function removerDoCarrinho(nome) {
    setCarrinho(carrinho.filter(item => item.nome !== nome));
  }

  function alterarQuantidade(nome, qtd) {
    setCarrinho(carrinho.map(item =>
      item.nome === nome ? { ...item, quantidade: Math.max(1, Number(qtd)) } : item
    ));
  }

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  function handlePessoaClick() {
    setShowLoginBox((prev) => !prev);
  }

   function handleLogout() {
    localStorage.removeItem('usuarioLogado');
    setUsuario('');
    setShowLoginBox(false);
  }

  React.useEffect(() => {
  setUsuario(localStorage.getItem('usuarioLogado') || '');
}, []);


  return (
    <div>
        <header className="cabecalho">
        <div className="cabecalho-titulo">Loja de Informática</div>
        <div className="cabecalho-botoes">
            <button className="cabecalho-btn" onClick={() => setCarrinhoAberto(true)}>
            <BagIcon width={50} height={50} style={{fill: '#fff' }}/>
            </button>
            <button className="cabecalho-btn" onClick={handlePessoaClick}>
            <PessoaIcon width={50} height={50} style={{fill: '#fff'}}/>
            </button>
            {usuario && (
              <span className="usuario-nome">{usuario.split( ' ')[0]}</span>
      )}
        </div>
        </header>
       {/* Login quadrado abaixo do botão */}
      {showLoginBox && (
        <div className="login-popup-box">
          {!usuario ? (
            <Link to="/login" className="login-popup-btn">Entrar</Link>
          ) : (
            <button className="login-popup-btn" onClick={handleLogout}>Sair</button>
          )}
        </div>
      )}
        <div style={{ backgroundColor: '#3B82F6', padding: '20px 0' }}>
            <div style={{  margin: 'auto', maxWidth: 1000, textAlign: 'center' }}>
                <Carousel>
                <Carousel.Item>
                    <img src={Banner1} alt="Banner 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Banner2} alt="Banner 2" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Banner3} alt="Banner 3" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                </Carousel.Item>
                </Carousel>
            </div>
        </div>
      {/* Loja de produtos */}
      <div className="loja-produtos-container" style={{ backgroundColor: '#4487f3' }}>
            <h2 className="loja-titulo">Shop Products</h2>
            <div className="loja-grid">
            {produtos.map((produto, idx) => (
                <div className="loja-produto" key={idx}>
                <div className="loja-produto-img-area">
                    <img src={produto.img} alt={produto.nome} className="loja-produto-img" />
                    <div className="loja-produto-nome">{produto.nome}</div>
                </div>
                <div className="loja-produto-footer">
                    <span className="loja-produto-preco">{produto.preco} R$</span>
                    <button className="loja-produto-btn" onClick={() => adicionarAoCarrinho(produto)}>
                    <BagIcon width={28} height={28} style={{ fill: '#000' }} />
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        {/* Carrinho lateral */}
      {carrinhoAberto && (
        <div className="carrinho-lateral">
          <div className="carrinho-header">
            <span className="carrinho-titulo">Seu Carrinho</span>
            <button className="carrinho-fechar" onClick={() => setCarrinhoAberto(false)}>X</button>
          </div>
          <div className="carrinho-itens">
            {carrinho.length === 0 && (
              <div className="carrinho-vazio">Seu carrinho está vazio.</div>
            )}
            {carrinho.map((item, idx) => (
              <div className="carrinho-item" key={item.nome}>
                <img src={item.img} alt={item.nome} className="carrinho-item-img" />
                <div className="carrinho-item-info">
                  <div className="carrinho-item-nome">{item.nome}</div>
                  <div className="carrinho-item-preco">
                    R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <input
                    type="number"
                    min={1}
                    className="carrinho-item-qtd"
                    value={item.quantidade}
                    onChange={e => alterarQuantidade(item.nome, e.target.value)}
                  />
                  <button className="carrinho-item-remover" onClick={() => removerDoCarrinho(item.nome)}>
                    <LixeiraIcon width={30} height={30} style={{ fill: '#000' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr className="carrinho-linha" />
          <div className="carrinho-total-area">
            <span className="carrinho-total-txt">Total</span>
            <span className="carrinho-total-preco">
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <button className="comprar-btn"  onClick={handleComprar}>Compre já</button>
            </div>
          </div>
      )}

      {pedidoFeito && (
        <div className="pedido-feito-overlay">
          <div className="pedido-feito-msg">Seu pedido foi feito.</div>
        </div>
      )}
        {/* Rodapé */}
        <footer className="footer-loja">
            <div className="footer-grid">
            <div className="footer-cell">
                <div className="footer-title">Mapa do site</div>
                <div className="footer-link">Política de Privacidade</div>
            </div>
            <div className="footer-cell">
                <div className="footer-title"></div>
                <div className="footer-link"></div>
            </div>
            <div className="footer-cell">
                <div className="footer-title">Contato</div>
                <div className="footer-link">Termo de uso</div>
            </div>
            </div>
            <div className="footer-grid">
            <div className="footer-cell">
                <div className="footer-title"></div>
                <div className="footer-link"></div>
            </div>
            <div className="footer-cell">
                <div className="footer-title">aloja@email.com</div>
                <div className="footer-link">2025 &copy; Loja de Informática</div>
            </div>
            <div className="footer-cell">
                <div className="footer-title"></div>
                <div className="footer-link"></div>
            </div>
            </div>
        </footer>
    </div>
  );
}