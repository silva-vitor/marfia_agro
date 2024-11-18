'use client'; // Indica que este código será executado no lado do cliente (em Next.js)

import React, { useEffect, useState } from 'react'; // Importa hooks do React para gerenciar o estado e efeitos colaterais
import Link from 'next/link'; // Importa o Link do Next.js para navegação entre páginas
import { Card, Col, Row, Button } from 'react-bootstrap'; // Importa componentes do React-Bootstrap para construir o layout
import Pagina from '@/components/Pagina'; // Importa o componente 'Pagina' que provavelmente estrutura o layout da página
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa'; // Importa ícones do React-Icons
import { useRouter } from 'next/navigation'; // Importa o hook useRouter para navegação programática

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]); // Estado para armazenar os itens no carrinho
  const router = useRouter(); // Hook para navegação para outras páginas

  // Carregar itens do carrinho do localStorage quando a página é carregada
  useEffect(() => {
    // Recupera os itens do carrinho do localStorage, ou um array vazio caso não haja nada armazenado
    const carrinhoLocal = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(carrinhoLocal); // Atualiza o estado do carrinho com os dados recuperados
  }, []); // O array vazio faz com que o efeito seja executado apenas uma vez, no momento da montagem do componente

  // Função para remover um item do carrinho
  const removerDoCarrinho = (id) => {
    // Filtra os itens do carrinho para remover aquele com o id especificado
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho); // Atualiza o estado com o novo carrinho
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho)); // Atualiza o localStorage com o novo carrinho
    alert('Item removido do carrinho!'); // Exibe um alerta informando que o item foi removido
  };

  // Função para finalizar o pedido
  const finalizarPedido = () => {
    // Verifica se há itens no carrinho antes de finalizar o pedido
    if (carrinho.length > 0) {
      localStorage.setItem('pedido', JSON.stringify(carrinho)); // Salva o pedido no localStorage
      localStorage.removeItem('carrinho'); // Limpa o carrinho do localStorage
      router.push('/pedido'); // Redireciona para a página de pedido
    } else {
      alert('Seu carrinho está vazio!'); // Exibe um alerta caso o carrinho esteja vazio
    }
  };

  return (
    <Pagina> {/* Componente Pagina que estrutura a página com um layout e título padrão */}
      <h1>🛒 Meu Carrinho</h1>

      {/* Verifica se o carrinho está vazio */}
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p> // Exibe mensagem caso não haja itens no carrinho
      ) : (
        <>
          <Row className="mt-4">
            {/* Mapeia os itens do carrinho e renderiza um Card para cada item */}
            {carrinho.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                {/* Exibe o produto com as informações de imagem, nome, validade, descrição, lote e preço */}
                <Card className="h-100 d-flex flex-column">
                  <Card.Img
                    src={item.imagem} // Exibe a imagem do item
                    alt={item.nome} // Alt da imagem
                    style={{ height: '250px' }} // Define a altura fixa para a imagem
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.nome}</Card.Title> {/* Nome do item */}
                    <Card.Text><b>Validade:</b> {item.validade}</Card.Text> {/* Validade do item */}
                    <Card.Text><b>Descrição:</b> {item.descrição}</Card.Text> {/* Descrição do item */}
                    <Card.Text><b>Lote:</b> {item.lote}</Card.Text> {/* Lote do item */}
                    <Card.Text><b>Valor:</b> R$ {item.valor}</Card.Text> {/* Preço do item */}

                    {/* Botão para remover o item do carrinho */}
                    <Button
                      variant="danger"
                      className="mt-auto w-100 d-flex align-items-center justify-content-center"
                      onClick={() => removerDoCarrinho(item.id)} // Chama a função para remover o item
                    >
                      <FaTrashAlt className="me-2" /> Remover {/* Ícone de lixeira */}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Botão para finalizar o pedido */}
          <Button
            variant="success"
            className="mt-4 w-100"
            onClick={finalizarPedido} // Chama a função para finalizar o pedido
          >
            Finalizar Pedido
          </Button>
        </>
      )}

      {/* Link para voltar à página de produtos caso o usuário queira continuar comprando */}
      <div className="mt-4">
        <Link href="/produtos" className="btn btn-primary">
          <FaShoppingCart className="me-2" /> Continuar Comprando {/* Ícone de carrinho */}
        </Link>
      </div>
    </Pagina>
  );
}
