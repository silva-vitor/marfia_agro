'use client';

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { GiPlantWatering } from "react-icons/gi";
import { TiArrowBack } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
import Pagina from "@/components/Pagina";
import ProdutoValidador from "@/validadores/produtoValidador";


export default function Page({ params }) {
    const route = useRouter();

    // Carrega os produtos do localStorage e encontra o produto pelo ID
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const dados = produtos.find(item => item.id == params.id);
    const produto = dados || { imagem: '', nome: '', validade: '', descrição: '', lote: '', valor: '' };

    // Função para salvar ou atualizar o produto no localStorage
    function salvar(dados) {
        if (produto.id) {
            Object.assign(produto, dados);
        } else {
            dados.id = uuidv4();
            produtos.push(dados);
        }
        localStorage.setItem('produtos', JSON.stringify(produtos));
        route.push('/login/produtos');
    }

    return (
        <Pagina titulo="Produto">
            <Formik
                initialValues={produto}
                validationSchema={ProdutoValidador} // Validação usando o Yup
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,
                    touched
                }) => (
                    <Form onSubmit={handleSubmit}>
                        {/* Campo para a imagem do produto */}
                        <Form.Group className="mb-3" controlId="imagem">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="file"
                                name="imagem"
                                accept=".jpg, .jpeg, .png, .gif, .bmp"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && file.size > 2 * 1024 * 1024) {
                                        alert("A imagem deve ter no máximo 2 MB");
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFieldValue("imagem", reader.result);
                                    };
                                    if (file) {
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            {errors.imagem && touched.imagem && (
                                <div className="text-danger">{errors.imagem}</div>
                            )}
                            {values.imagem && (
                                <img
                                    src={values.imagem}
                                    alt="Pré-visualização"
                                    style={{ width: '200px', height: '200px', objectFit: 'cover', marginTop: '10px' }}
                                />
                            )}
                        </Form.Group>

                        {/* Campo para o nome */}
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                                isInvalid={touched.nome && !!errors.nome}
                            />
                            <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo para validade */}
                        <Form.Group className="mb-3" controlId="validade">
                            <Form.Label>Validade</Form.Label>
                            <Form.Control
                                type="date"
                                name="validade"
                                value={values.validade}
                                onChange={handleChange}
                                isInvalid={touched.validade && !!errors.validade}
                            />
                            <Form.Control.Feedback type="invalid">{errors.validade}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo para descrição */}
                        <Form.Group className="mb-3" controlId="descrição">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descrição"
                                value={values.descrição}
                                onChange={handleChange}
                                isInvalid={touched.descrição && !!errors.descrição}
                            />
                            <Form.Control.Feedback type="invalid">{errors.descrição}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo para lote */}
                        <Form.Group className="mb-3" controlId="lote">
                            <Form.Label>Lote</Form.Label>
                            <Form.Control
                                type="text"
                                name="lote"
                                value={values.lote}
                                onChange={handleChange}
                                isInvalid={touched.lote && !!errors.lote}
                            />
                            <Form.Control.Feedback type="invalid">{errors.lote}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Campo para valor */}
                        <Form.Group className="mb-3" controlId="valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="text"
                                name="valor"
                                value={values.valor}
                                onChange={handleChange}
                                isInvalid={touched.valor && !!errors.valor}
                            />
                            <Form.Control.Feedback type="invalid">{errors.valor}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" variant="success">
                                <GiPlantWatering /> Salvar
                            </Button>
                            <Link href="/login/produtos" className="btn btn-danger ms-2">
                                <TiArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
