'use client'; // Indica que este componente é renderizado no lado do cliente em Next.js

import Pagina from "@/components/Pagina"; // Importa o componente de layout comum para renderizar páginas
import Link from "next/link"; // Importa o Link do Next.js para navegação entre páginas
import { useEffect, useState } from "react"; // Hooks do React para gerenciar o estado e efeitos colaterais
import { Card, Col, Row } from "react-bootstrap"; // Componentes do Bootstrap para estrutura e estilização
import { FaPlusCircle, FaRegEdit } from "react-icons/fa"; // Ícones para adicionar e editar
import { MdDelete } from "react-icons/md"; // Ícone para excluir

export default function Page() {
    const [produtos, setProdutos] = useState([]); // Estado para armazenar a lista de produtos

    // useEffect para carregar os produtos do localStorage assim que o componente for montado
    useEffect(() => {
        setProdutos(JSON.parse(localStorage.getItem('produtos')) || []); // Carrega produtos ou um array vazio
    }, []); // O array vazio garante que o efeito só seja executado uma vez após o primeiro render

    // Função para excluir um produto, solicitando confirmação do usuário
    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) { // Confirmação de exclusão
            // Filtra os produtos para remover o que tem o id correspondente
            const dados = produtos.filter(item => item.id != id);
            // Atualiza o localStorage com a lista filtrada (sem o produto excluído)
            localStorage.setItem('produtos', JSON.stringify(dados));
            // Atualiza o estado com a nova lista de produtos
            setProdutos(dados);
        }
    }

    return (
        <Pagina>
            {/* Link para criar um novo produto */}
            <Link href="/login/produtos/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>

            {/* Exibe a lista de produtos em um grid */}
            <Row className="mt-4">
                {produtos.map(item => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        {/* Card que exibe informações do produto */}
                        <Card className="h-100 d-flex flex-column">
                            <Card.Img
                                src={item.imagem} // Imagem do produto
                                alt={item.nome} // Texto alternativo para a imagem
                                style={{ height: '250px' }} // Tamanho da imagem
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{item.nome || 'Sem título'}</Card.Title> {/* Nome do produto */}
                                <Card.Text><b>Validade:</b> {item.validade}</Card.Text> {/* Validade do produto */}
                                <Card.Text><b>Descrição:</b> {item.descrição}</Card.Text> {/* Descrição */}
                                <Card.Text><b>Lote:</b> {item.lote}</Card.Text> {/* Lote */}
                                <Card.Text><b>Valor:</b> R$ {item.valor}</Card.Text> {/* Valor */}

                                {/* Botões de ação (editar e excluir) fixados na parte inferior do card */}
                                <div className="mt-auto d-flex justify-content-between">
                                    {/* Link para editar o produto, levando o usuário para a página de edição */}
                                    <Link href={`/login/produtos/form/${item.id}`} className="text-primary">
                                        <FaRegEdit title="Editar" /> {/* Ícone de editar */}
                                    </Link>
                                    {/* Botão para excluir o produto */}
                                    <MdDelete 
                                        title="Excluir"
                                        className="text-danger"
                                        style={{ cursor: 'pointer' }} // Mostra o cursor de "pointer" ao passar o mouse
                                        onClick={() => excluir(item.id)} // Chama a função de excluir ao clicar
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
