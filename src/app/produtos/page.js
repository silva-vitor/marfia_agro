'use client'; // Indica que este componente é executado no cliente

import Pagina from "@/components/Pagina"; // Componente de layout
import Link from "next/link"; // Link de navegação do Next.js
import { useEffect, useState } from "react"; // Hook de estado e efeito do React
import { Card, Col, Row } from "react-bootstrap"; // Componentes do Bootstrap
import { FaShoppingCart } from "react-icons/fa"; // Ícone de carrinho de compras

export default function Page() {
    // Estados para armazenar os produtos, carrinho e pedido
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [pedido, setPedido] = useState([]);

    // Carregar dados do localStorage ao carregar a página
    useEffect(() => {
        setProdutos(JSON.parse(localStorage.getItem('produtos')) || []); // Produtos
        setCarrinho(JSON.parse(localStorage.getItem('carrinho')) || []); // Carrinho
        setPedido(JSON.parse(localStorage.getItem('pedido')) || []); // Pedido
    }, []);

    // Função para adicionar produto ao carrinho
    const adicionarAoCarrinho = (produto) => {
        const novoCarrinho = [...carrinho, produto]; // Adiciona produto ao carrinho
        setCarrinho(novoCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho)); // Armazena no localStorage
        alert(`${produto.nome} foi adicionado ao carrinho!`);
    };

    // Função para adicionar produto ao pedido
    const adicionarAoPedido = (produto) => {
        const novoPedido = [...pedido, produto]; // Adiciona produto ao pedido
        setPedido(novoPedido);
        localStorage.setItem('pedido', JSON.stringify(novoPedido)); // Armazena no localStorage
        alert(`${produto.nome} foi adicionado ao pedido!`);
    };

    return (
        <Pagina>
            {/* Exibição dos produtos */}
            <Row className="mt-4">
                {produtos.map((item) => (
                    <Col
                        key={item.id}
                        xs={12} sm={6} md={4} lg={3}  // Responsividade
                        className="mb-4"
                    >
                        <Card className="h-100 d-flex flex-column">
                            <Card.Img
                                src={item.imagem}
                                alt={item.nome}
                                style={{ height: '250px' }}  // Tamanho fixo da imagem
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{item.nome || 'Produto'}</Card.Title>
                                <Card.Text><b>Validade:</b> {item.validade}</Card.Text>
                                <Card.Text><b>Descrição:</b> {item.descrição}</Card.Text>
                                <Card.Text><b>Lote:</b> {item.lote}</Card.Text>
                                <Card.Text><b>Valor:</b> R$ {item.valor}</Card.Text>
                                {/* Botões para adicionar ao carrinho ou ao pedido */}
                                <div className="mt-auto">
                                    <button
                                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                        onClick={() => adicionarAoPedido(item)} // Adicionar ao pedido
                                    >
                                        <FaShoppingCart className="mt-2" /> <b>Pedido</b>
                                    </button>
                                    <button
                                        className="btn btn-success w-100 d-flex align-items-center justify-content-center mt-2"
                                        onClick={() => adicionarAoCarrinho(item)} // Adicionar ao carrinho
                                    >
                                        <FaShoppingCart className="mt-2" /> 
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
