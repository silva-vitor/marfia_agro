'use client';

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { IoMdAirplane } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
import Pagina from "@/components/Pagina";

export default function Page({ params }) {
    const route = useRouter();

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const dados = produtos.find(item => item.id == params.id);
    const produto = dados || { imagem: '', nome: '', validade: '', descrição: '', lote: '', valor: '' };

    function salvar(dados) {
        if (produto.id) {
            Object.assign(produto, dados);
        } else {
            dados.id = uuidv4();
            produtos.push(dados);
        }
        localStorage.setItem('produtos', JSON.stringify(produtos));
        route.push('/produtos');
    }

    return (
        <Pagina titulo="Produto">
            <Formik
                initialValues={produto}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="imagem">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="file"
                                name="imagem"
                                accept=".jpg, .jpeg, .png, .gif, .bmp"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    // Verificação opcional do tamanho da imagem
                                    if (file && file.size > 2 * 1024 * 1024) { // Limite de 2 MB
                                        alert("A imagem deve ter no máximo 2 MB");
                                        return;
                                    }

                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFieldValue("imagem", reader.result); // Define a URL da imagem
                                    };
                                    if (file) {
                                        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
                                    }
                                }}
                            />
                            {/* Pré-visualização da imagem com tamanho definido */}
                            {values.imagem && (
                                <img
                                    src={values.imagem}
                                    alt="Pré-visualização"
                                    style={{
                                        width: '200px',  // Largura da imagem
                                        height: '200px', // Altura da imagem
                                        objectFit: 'cover', // Ajusta a imagem para cobrir o espaço sem distorção
                                        marginTop: '10px'
                                    }}
                                />
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validade">
                            <Form.Label>Validade</Form.Label>
                            <Form.Control
                                type="date"
                                name="validade"
                                value={values.validade}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descrição">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descrição"
                                value={values.descrição}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lote">
                            <Form.Label>Lote</Form.Label>
                            <Form.Control
                                type="text"
                                name="lote"
                                value={values.lote}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="text"
                                name="valor"
                                value={values.valor}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" variant="success">
                                <IoMdAirplane /> Salvar
                            </Button>
                            <Link href="/produtos" className="btn btn-danger ms-2">
                                <TiArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
