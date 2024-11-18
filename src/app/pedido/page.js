'use client'; // Indica que este é um componente que roda no lado do cliente

import React, { useEffect, useState } from 'react'; // Importa hooks do React
import { Card, Col, Row } from 'react-bootstrap'; // Componentes do Bootstrap para layout e estilo
import Pagina from '@/components/Pagina'; // Componente de layout personalizado
import Link from 'next/link'; // Componente de navegação do Next.js
import { FaArrowLeft } from 'react-icons/fa'; // Ícone para a seta para voltar

export default function Pedido() {
  const [pedido, setPedido] = useState([]); // Estado para armazenar os dados do pedido

  // useEffect para carregar os dados do pedido do localStorage ao carregar a página
  useEffect(() => {
    const pedidoLocal = JSON.parse(localStorage.getItem('pedido')) || []; // Recupera o pedido do localStorage ou define como array vazio
    setPedido(pedidoLocal); // Atualiza o estado com os dados do pedido
  }, []); // Executa apenas uma vez, quando o componente for montado

  return (
    <Pagina> {/* Componente de layout que envolve o conteúdo */}
      <h1>📦 Pedido Finalizado</h1>

      {/* Exibe uma mensagem se o pedido estiver vazio */}
      {pedido.length === 0 ? (
        <p>Você ainda não finalizou nenhum pedido.</p>
      ) : (
        <Row className="mt-4"> {/* Grid para exibir os produtos */}
          {pedido.map((item, index) => ( // Para cada produto no pedido, renderiza um card
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 d-flex flex-column"> {/* Card do Bootstrap */}
                <Card.Img
                  src={item.imagem} // Imagem do produto
                  alt={item.nome} // Texto alternativo para a imagem
                  style={{ height: '250px' }} // Define o tamanho da imagem
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.nome}</Card.Title> {/* Nome do produto */}
                  <Card.Text><b>Validade:</b> {item.validade}</Card.Text> {/* Validade */}
                  <Card.Text><b>Descrição:</b> {item.descrição}</Card.Text> {/* Descrição */}
                  <Card.Text><b>Lote:</b> {item.lote}</Card.Text> {/* Lote */}
                  <Card.Text><b>Valor:</b> R$ {item.valor}</Card.Text> {/* Valor */}
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
