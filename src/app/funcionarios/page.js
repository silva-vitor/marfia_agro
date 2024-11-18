'use client'; // Indica que o código deve ser executado no lado do cliente (em Next.js)

import Pagina from "@/components/Pagina"; // Importa o componente Pagina, que provavelmente define a estrutura básica da página
import Link from "next/link"; // Importa o Link do Next.js para navegação entre páginas
import { useEffect, useState } from "react"; // Importa hooks do React para controle de estado e efeitos colaterais
import { Table } from "react-bootstrap"; // Importa o componente Table do React-Bootstrap para exibição de tabelas
import { FaPlusCircle, FaRegEdit } from "react-icons/fa"; // Importa ícones do React Icons para adicionar e editar
import { MdDelete } from "react-icons/md"; // Importa o ícone de excluir

export default function Page() {
  const [funcionarios, setFuncionarios] = useState([]); // Define o estado para armazenar a lista de funcionários

  // useEffect é usado para carregar os dados do localStorage assim que o componente for montado
  useEffect(() => {
    const storedData = localStorage.getItem('funcionarios'); // Tenta obter os dados de funcionários do localStorage
    if (storedData) setFuncionarios(JSON.parse(storedData)); // Se os dados existirem, converte de volta para objeto e atualiza o estado
  }, []); // O array vazio [] garante que o useEffect seja executado apenas uma vez, na montagem do componente

  // Função para excluir um funcionário do localStorage e atualizar o estado
  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) { // Confirmação para garantir que o usuário deseja excluir
      const novosDados = funcionarios.filter(item => item.id !== id); // Filtra os funcionários removendo o de id correspondente
      localStorage.setItem('funcionarios', JSON.stringify(novosDados)); // Atualiza os dados no localStorage
      setFuncionarios(novosDados); // Atualiza o estado com os novos dados
    }
  }

  return (
    <Pagina titulo="Funcionários"> {/* Renderiza o componente Pagina com o título "Funcionários" */}
      
      {/* Link para adicionar um novo funcionário, direcionando para a página de formulário */}
      <Link href="/funcionarios/form" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo {/* Ícone de adição de novo funcionário */}
      </Link>

      {/* Tabela que lista os funcionários */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ações</th> {/* Coluna para ações como editar e excluir */}
            <th>ID</th>
            <th>Nome</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeia o array de funcionários para gerar uma linha para cada item */}
          {funcionarios.map((item) => (
            <tr key={item.id}>
              <td>
                {/* Link para editar o funcionário, direcionando para o formulário de edição */}
                <Link href={`/funcionarios/form/${item.id}`} className="me-2">
                  <FaRegEdit title="Editar" className="text-primary" /> {/* Ícone de editar */}
                </Link>
                {/* Ícone de excluir, que chama a função excluir ao ser clicado */}
                <MdDelete
                  title="Excluir"
                  className="text-danger cursor-pointer"
                  onClick={() => excluir(item.id)} // Passa o id do funcionário para a função excluir
                />
              </td>
              <td>{item.id}</td> {/* Exibe o ID do funcionário */}
              <td>{item.nome}</td> {/* Exibe o nome do funcionário */}
              <td>{item.documento}</td> {/* Exibe o número do documento */}
              <td>{item.email}</td> {/* Exibe o email do funcionário */}
              <td>{item.telefone}</td> {/* Exibe o telefone do funcionário */}
              <td>{item.data_nascimento}</td> {/* Exibe a data de nascimento */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
