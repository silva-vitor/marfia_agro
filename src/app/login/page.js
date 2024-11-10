'use client';

// Importações necessárias do Formik, Next.js, React e Bootstrap
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Container } from "react-bootstrap";
import { FaTractor } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti"; // Ícone de seta para voltar
import { v4 as uuidv4 } from "uuid"; // Gerador de IDs únicos
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const route = useRouter();
    const searchParams = useSearchParams();
    const funcionarioId = params.id || searchParams.get('id');

    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionario, setFuncionario] = useState({
        id: '',
        nome: '',
        documento: '',
        email: '',
        telefone: '',
        senha: ''
    });

    useEffect(() => {
        const storedFuncionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        setFuncionarios(storedFuncionarios);

        if (funcionarioId) {
            const dados = storedFuncionarios.find(item => item.id === funcionarioId);
            if (dados) setFuncionario(dados);
        }
    }, [funcionarioId]);

    function salvar(dados) {
        let novosFuncionarios;

        if (dados.id) {
            novosFuncionarios = funcionarios.map(item =>
                item.id === dados.id ? { ...item, ...dados } : item
            );
        } else {
            dados.id = uuidv4();
            novosFuncionarios = [...funcionarios, dados];
        }

        localStorage.setItem('funcionarios', JSON.stringify(novosFuncionarios));
        setFuncionarios(novosFuncionarios);
        route.push('/funcionarios/alteracao');
    }

    return (
        <>
            {/* Container para centralizar o formulário com imagem de fundo */}
            <Container
                fluid
                className="d-flex justify-content-center align-items-center vh-100"
                style={{
                    backgroundImage: "url('https://i.ytimg.com/vi/9v8tB27etk4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCnJ1QpWj_6hs20iTlJ5HplMai_ig')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="border p-4 rounded shadow bg-light" style={{ maxWidth: '400px', width: '100%' }}>
                    {/* Logo */}
                    <div className="text-center mb-4">
                        <img
                            src="https://yt3.googleusercontent.com/6c_rKkbSUGia02avdrtRArFxfaiJq8Uu1-3oyzR3KUGWBKD8g5NHDXB60pNRcJoSxSrS4qvUfQ=s900-c-k-c0x00ffffff-no-rj"
                            alt="Logo"
                            style={{ width: '50px' }}
                        />
                    </div>

                    {/* Formulário de Login utilizando Formik */}
                    <Formik
                        initialValues={funcionario}
                        enableReinitialize
                        onSubmit={salvar}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                    />
                                    <Form.Text className="text-muted">
                                        Nunca compartilharemos seu e-mail com mais ninguém.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="senha">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="senha"
                                        value={values.senha}
                                        onChange={handleChange}
                                        placeholder="Password"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="lembrar">
                                    <Form.Check type="checkbox" label="Lembrar-me" />
                                </Form.Group>

                                <Button type="submit" variant="success" className="w-100">
                                    <FaTractor /> Logar
                                </Button>

                                <Link href="/" className="btn btn-danger mt-2 w-100">
                                    <TiArrowBack /> Voltar
                                </Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </>
    );
}
