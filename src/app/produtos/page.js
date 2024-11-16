'use client'

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

export default function Page() {
    // Estado para armazenar produtos
    const [produtos, setProdutos] = useState([]);
    // Estado para armazenar o carrinho
    const [carrinho, setCarrinho] = useState([]);

    // Carregar produtos do localStorage ao carregar a página
    useEffect(() => {
        setProdutos(JSON.parse(localStorage.getItem('produtos')) || []);
        // Carregar carrinho do localStorage
        setCarrinho(JSON.parse(localStorage.getItem('carrinho')) || []);
    }, []);

    // Função para adicionar um produto ao carrinho
    const adicionarAoCarrinho = (produto) => {
        const novoCarrinho = [...carrinho, produto];
        setCarrinho(novoCarrinho);
        // Armazenar o carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        alert(`${produto.nome} foi adicionado ao carrinho!`);
    };

    return (
        <Pagina>
            <Row className="mt-4">
                {/* Mapeia os produtos e renderiza um card para cada item */}
                {produtos.map((item) => (
                    <Col
                        key={item.id}
                        xs={12} sm={6} md={4} lg={3}
                        className="mb-4"
                    >
                        <Card className="h-100 d-flex flex-column">
                            <Card.Img
                                src={item.imagem}
                                alt={item.nome}
                                style={{ height: '250px' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{item.nome || 'Produto'}</Card.Title>
                                <Card.Text><b>Validade:</b> {item.validade}</Card.Text>
                                <Card.Text><b>Descrição:</b> {item.descrição}</Card.Text>
                                <Card.Text><b>Lote:</b> {item.lote}</Card.Text>
                                <Card.Text><b>Valor:</b> R$ {item.valor}</Card.Text>
                                {/* Botão para adicionar ao carrinho */}
                                <div className="mt-auto">
                                    <button
                                        className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                                        onClick={() => adicionarAoCarrinho(item)}
                                    >
                                        <FaShoppingCart className="me-2" /> 
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    );
}
