'use client'

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        setProdutos(JSON.parse(localStorage.getItem('produtos')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = produtos.filter(item => item.id != id);
            localStorage.setItem('produtos', JSON.stringify(dados));
            setProdutos(dados);
        }
    }

    return (
        <Pagina>
            <Link href="/login/produtos/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>

            <Row className="mt-4">
                {produtos.map(item => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="h-100 d-flex flex-column">
                            <Card.Img
                                src={item.imagem}
                                alt={item.nome}
                                style={{ height: '250px' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{item.nome || 'Sem título'}</Card.Title>
                                <Card.Text><b>Validade:</b> {item.validade}</Card.Text>
                                <Card.Text><b>Descrição:</b> {item.descrição}</Card.Text>
                                <Card.Text><b>Lote:</b> {item.lote}</Card.Text>
                                <Card.Text><b>Valor:</b> R$ {item.valor}</Card.Text>

                                {/* Botões de ação fixados na parte inferior */}
                                <div className="mt-auto d-flex justify-content-between">
                                    <Link href={`/login/produtos/form/${item.id}`} className="text-primary">
                                        <FaRegEdit title="Editar" />
                                    </Link>
                                    <MdDelete 
                                        title="Excluir"
                                        className="text-danger"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => excluir(item.id)}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    );
}
