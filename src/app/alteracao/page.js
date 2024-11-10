'use client'

import Pagina from "@/components/Pagina";
import Link from "next/link"
import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function Page() {

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        setProdutos(JSON.parse(localStorage.getItem('produtos')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = produtos.filter(item => item.id != id)
            localStorage.setItem('produtos', JSON.stringify(dados))
            setProdutos(dados)
        }
    }

    return (
        <Pagina titulo="ALteração de produtos">

            <Link href="/alteracao" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>

            <Row className="mt-4">
                {produtos.map(item => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card style={{ width: '100%' }}>
                            <Card.Img
                                src={item.imagem}
                                alt={item.nome}
                                width={100}
                            />
                            <Card.Body>
                                <Card.Title>{item.nome || 'Card Title'}</Card.Title>

                                <Card.Text>
                                    <b>Validade:</b> {item.validade}
                                </Card.Text>
                                <Card.Text>
                                    <b>Descrição:</b> {item.descrição}
                                </Card.Text>
                                <Card.Text>
                                    <b>Lote:</b> {item.lote}
                                </Card.Text>
                                <Card.Text>
                                    <b>Valor:</b> {item.valor}
                                </Card.Text>
                                <Link href={`/produtos/form/${item.id}`} className="me-2">

                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}