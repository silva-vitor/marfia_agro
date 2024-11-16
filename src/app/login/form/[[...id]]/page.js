'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { IoMdAirplane } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
import Pagina from "@/components/Pagina";
import { Formik } from 'formik';

export default function Page({ params }) {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({ imagem: '', nome: '', validade: '', descrição: '', lote: '', valor: '' });

  useEffect(() => {
    const storedProdutos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produtoAtual = storedProdutos.find(item => item.id === params.id);

    if (produtoAtual) {
      setProduto(produtoAtual);
    } else {
      // Caso o produto não exista, redireciona para a lista de produtos
      router.push('/login/produtos');
    }
    setProdutos(storedProdutos);
  }, [params.id, router]);

  const salvar = (dados) => {
    let updatedProdutos = [...produtos];
    if (produto.id) {
      const index = updatedProdutos.findIndex(item => item.id === produto.id);
      updatedProdutos[index] = { ...produto, ...dados };
    } else {
      dados.id = uuidv4();
      updatedProdutos.push(dados);
    }
    localStorage.setItem('produtos', JSON.stringify(updatedProdutos));
    router.push('/login/produtos'); // Redireciona para a lista de produtos após salvar
  };

  return (
    <Pagina titulo="Produto">
      <Formik
        enableReinitialize={true}
        initialValues={produto}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {/* Campos do formulário */}
            <Form.Group className="mb-3" controlId="imagem">
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type="file"
                name="imagem"
                accept=".jpg, .jpeg, .png, .gif, .bmp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.size > 2 * 1024 * 1024) {
                    alert("A imagem deve ter no máximo 2 MB");
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => setFieldValue("imagem", reader.result);
                  file && reader.readAsDataURL(file);
                }}
              />
              {values.imagem && (
                <img
                  src={values.imagem}
                  alt="Pré-visualização"
                  style={{ width: '200px', height: '200px', objectFit: 'cover', marginTop: '10px' }}
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
                type="text"
                name="validade"
                value={values.validade}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
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
                type="number"
                name="valor"
                value={values.valor}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="success">
                <IoMdAirplane /> Salvar
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
