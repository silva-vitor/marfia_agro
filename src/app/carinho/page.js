'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Col, Row, Button } from 'react-bootstrap';
import Pagina from '@/components/Pagina';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const router = useRouter();

  // Carregar itens do carrinho do localStorage quando a página é carregada
  useEffect(() => {
    const carrinhoLocal = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(carrinhoLocal);
  }, []);

  // Função para remover um item do carrinho
  const removerDoCarrinho = (id) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    alert('Item removido do carrinho!');
  };

  // Função para finalizar pedido
  const finalizarPedido = () => {
    if (carrinho.length > 0) {
      localStorage.setItem('pedido', JSON.stringify(carrinho)); // Salva o pedido no localStorage
      localStorage.removeItem('carrinho'); // Limpa o carrinho
      router.push('/pedido'); // Redireciona para a página de pedido
    } else {
      alert('Seu carrinho está vazio!');
    }
  };

  return (
    <Pagina>
      <h1>🛒 Meu Carrinho</h1>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <Row className="mt-4">
            {carrinho.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 d-flex flex-column">
                  <Card.Img
                    src={item.imagem}
                    alt={item.nome}
                    style={{ height: '250px' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.nome}</Card.Title>
                    <Card.Text><b>Validade:</b> {item.validade}</Card.Text>
                    <Card.Text><b>Descrição:</b> {item.descrição}</Card.Text>
                    <Card.Text><b>Lote:</b> {item.lote}</Card.Text>
                    <Card.Text><b>Valor:</b> R$ {item.valor}</Card.Text>

                    {/* Botão para remover o item do carrinho */}
                    <Button
                      variant="danger"
                      className="mt-auto w-100 d-flex align-items-center justify-content-center"
                      onClick={() => removerDoCarrinho(item.id)}
                    >
                      <FaTrashAlt className="me-2" /> Remover
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
            onClick={finalizarPedido}
          >
            Finalizar Pedido
          </Button>
        </>
      )}

      {/* Link para voltar à página de produtos */}
      <div className="mt-4">
        <Link href="/produtos" className="btn btn-primary">
          <FaShoppingCart className="me-2" /> Continuar Comprando
        </Link>
      </div>
    </Pagina>
  );
}
