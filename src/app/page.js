'use client';

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function Page() {
  // Estado para armazenar a lista de produtos carregada do localStorage
  const [produtos, setProdutos] = useState([]);

  // Carregar produtos do localStorage quando o componente é montado
  useEffect(() => {
    // Obtém os produtos do localStorage e faz o parse para um array
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos') || '[]');
    setProdutos(produtosSalvos);
  }, []);

  return (
    <Pagina>
      {/* Renderiza os produtos em uma grade responsiva */}
      <Row className="mt-4">
        {/* Verifica se há produtos para exibir */}
        {produtos.length === 0 && (
          <p className="text-center">Nenhum produto disponível no momento.</p>
        )}

        {/* Mapeia os produtos e cria um card para cada item */}
        {produtos.map((item) => (
          <Col
            key={item.id} // Define uma chave única para cada coluna
            xs={12} sm={6} md={4} lg={3} // Define tamanhos responsivos para as colunas
            className="mb-4" // Adiciona margem inferior entre os cards
          >
            {/* Link para redirecionar ao clicar no card */}
            <a href={"/produtos"}  style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className="h-100 d-flex flex-column">
                {/* Imagem do produto */}
                <Card.Img
                  src={item.imagem} // Fonte da imagem do produto
                  alt={item.nome || 'Imagem do produto'} // Texto alternativo para acessibilidade
                  style={{ height: '250px', objectFit: 'cover' }} // Define altura fixa e recorte da imagem
                />

                {/* Corpo do card com título e descrição */}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.nome || 'Produto sem nome'}</Card.Title>

                  {/* Descrição do produto */}
                  <Card.Text>
                    <b>Descrição:</b> {item.descrição || 'Nenhuma descrição disponível'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
