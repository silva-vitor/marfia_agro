'use client';

import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaTractor } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
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
    telefone: ''
  });

  // Carregar os funcionários do localStorage ao montar o componente
  useEffect(() => {
    const storedFuncionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    setFuncionarios(storedFuncionarios);

    // Se existir um id nos params, carregar os dados do funcionário
    if (funcionarioId) {
      const dados = storedFuncionarios.find(item => item.id === funcionarioId);
      if (dados) setFuncionario(dados);
    }
  }, [funcionarioId]);

  // Função para salvar ou atualizar o funcionário
  function salvar(dados) {
    if (funcionario.id) {
      // Atualizar funcionário
      const updatedFuncionarios = funcionarios.map(item =>
        item.id === funcionario.id ? { ...item, ...dados } : item
      );
      localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios));
      setFuncionarios(updatedFuncionarios);
    } else {
      // Adicionar novo funcionário
      dados.id = uuidv4();
      const novosFuncionarios = [...funcionarios, dados];
      localStorage.setItem('funcionarios', JSON.stringify(novosFuncionarios));
      setFuncionarios(novosFuncionarios);
    }
    route.push('/funcionarios');
  }

  return (
    <Pagina titulo="Funcionário">
      <Formik
        initialValues={funcionario}
        enableReinitialize
        onSubmit={values => salvar(values)}
      >
        {({
           values, 
        handleChange,
         handleSubmit
         }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={values.id}
                onChange={handleChange}
                disabled
              />
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

            <Form.Group className="mb-3" controlId="documento">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                name="documento"
                value={values.documento}
                onChange={handleChange}
              />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="telefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                name="telefone"
                value={values.telefone}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="success">
                <FaTractor /> Salvar
              </Button>
              <Link href="/" className="btn btn-danger ms-2">
                <TiArrowBack /> Voltar
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
