'use client';

import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import Pagina from '@/components/Pagina';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function Pedido() {
  const [pedido, setPedido] = useState([]);

  // Carregar o pedido do localStorage ao carregar a página
  useEffect(() => {
    const pedidoLocal = JSON.parse(localStorage.getItem('pedido')) || [];
    setPedido(pedidoLocal);
  }, []);

  return (
    <Pagina>
      <h1>📦 Pedido Finalizado</h1>

      {pedido.length === 0 ? (
        <p>Você ainda não finalizou nenhum pedido.</p>
      ) : (
        <Row className="mt-4">
          {pedido.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Link para voltar à página de produtos */}
      <div className="mt-4">
        <Link href="/produtos" className="btn btn-secondary">
          <FaArrowLeft className="me-2" /> Voltar para Produtos
        </Link>
      </div>
    </Pagina>
  );
}
