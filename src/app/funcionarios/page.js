'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [funcionarios, setFuncionarios] = useState([]);

  // Carregar os dados do localStorage ao montar o componente
  useEffect(() => {
    const storedData = localStorage.getItem('funcionarios');
    if (storedData) setFuncionarios(JSON.parse(storedData));
  }, []);

  // Função para excluir um funcionário
  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const novosDados = funcionarios.filter(item => item.id !== id);
      localStorage.setItem('funcionarios', JSON.stringify(novosDados));
      setFuncionarios(novosDados);
    }
  }

  return (
    <Pagina titulo="Funcionários">
      {/* Botão para adicionar um novo funcionário */}
      <Link href="/funcionarios/form" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo
      </Link>

      {/* Tabela de funcionários */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ações</th>
            <th>ID</th>
            <th>Nome</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((item, i) => (
            <tr key={item.id}>
              <td>
                {/* Ações de editar e excluir */}
                <Link href={`/funcionarios/form/${item.id}`} className="me-2">
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger cursor-pointer"
                  onClick={() => excluir(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.documento}</td>
              <td>{item.email}</td>
              <td>{item.telefone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
