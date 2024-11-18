'use client'

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";


export default function Page({ params }) {

    const route = useRouter();

    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const dados = funcionarios.find(item => item.id == params.id);
    const funcionario = dados || { nome: '', email: '', telefone: '', data_nascimento: '', tipo_documento: '', documento: '' };

    function salvar(dados) {
        if (funcionario.id) {
            Object.assign(funcionario, dados);
        } else {
            dados.id = v4();
            funcionarios.push(dados);
        }

        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
        return route.push('/funcionarios');
    }

    return (
        <Pagina titulo="Funcionário">
            <Formik
                initialValues={funcionario}
                validationSchema={FuncionarioValidador} // Aplica a validação
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,
                    touched
                }) => {
                    useEffect(() => {
                        switch (values.tipo_documento) {
                            case 'CPF':
                                values.documento = mask(values.documento, '999.999.999-99');
                                break;
                            case 'CNPJ':
                                values.documento = mask(values.documento, '99.999.999/9999-99');
                                break;
                            case 'RG':
                                values.documento = mask(values.documento, '9.999.999');
                                break;
                            case 'Passaporte':
                                values.documento = mask(values.documento, 'AAA9999');
                                break;
                        }
                    }, [values.documento]);

                    useEffect(() => {
                        values.documento = '';
                    }, [values.tipo_documento]);

                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={touched.nome && errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="tipo_documento">
                                <Form.Label>Tipo de Documento</Form.Label>
                                <Form.Select
                                    name="tipo_documento"
                                    value={values.tipo_documento}
                                    onChange={handleChange}
                                    isInvalid={touched.tipo_documento && errors.tipo_documento}
                                >
                                    <option value=''>Selecione</option>
                                    <option value='CPF'>CPF</option>
                                    <option value='CNPJ'>CNPJ</option>
                                    <option value='RG'>RG</option>
                                    <option value='Passaporte'>Passaporte</option>
                                    <option value='Outro'>Outro</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.tipo_documento}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="documento">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="documento"
                                    value={values.documento}
                                    onChange={handleChange}
                                    isInvalid={touched.documento && errors.documento}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.documento}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={touched.email && errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(value) => {
                                        setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999'));
                                    }}
                                    isInvalid={touched.telefone && errors.telefone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="data_nascimento">
                                <Form.Label>Dt Nascimento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="data_nascimento"
                                    value={values.data_nascimento}
                                    onChange={(value) => {
                                        setFieldValue('data_nascimento', mask(value.target.value, '99/99/9999'));
                                    }}
                                    isInvalid={touched.data_nascimento && errors.data_nascimento}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.data_nascimento}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/funcionarios" className="btn btn-danger ms-2">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
