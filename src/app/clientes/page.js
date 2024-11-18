'use client'; // Indica que este código será executado no lado do cliente (em Next.js)

import Pagina from "@/components/Pagina"; // Importa o componente 'Pagina', que provavelmente estrutura o layout da página
import Link from "next/link"; // Importa o Link do Next.js para navegação entre páginas
import { useEffect, useState } from "react"; // Importa hooks do React para controle de estado e efeitos colaterais
import { Table } from "react-bootstrap"; // Importa o componente Table do React-Bootstrap para renderizar a tabela
import { FaPlusCircle, FaRegEdit } from "react-icons/fa"; // Importa os ícones do React-Icons
import { MdDelete } from "react-icons/md"; // Importa o ícone de exclusão

export default function Page() {
  // Estado para armazenar a lista de clientes
  const [clientes, setClientes] = useState([]); // Inicializa o estado 'clientes' como um array vazio

  // Carregar os dados do localStorage ao montar o componente
  useEffect(() => {
    // Quando o componente for montado, tentar recuperar os dados dos clientes no localStorage
    const storedData = localStorage.getItem('clientes');
    if (storedData) {
      // Se existirem dados armazenados, parse (converter de string para objeto) e definir no estado
      setClientes(JSON.parse(storedData));
    }
  }, []); // A dependência vazia [] faz o useEffect rodar apenas uma vez, na montagem do componente

  // Função para excluir um cliente
  function excluir(id) {
    // Exibe um alerta de confirmação antes de excluir o cliente
    if (confirm('Deseja realmente excluir o registro?')) {
      // Filtra a lista de clientes para remover o cliente com o ID específico
      const novosDados = clientes.filter(item => item.id !== id);
      // Atualiza o localStorage com a nova lista de clientes
      localStorage.setItem('clientes', JSON.stringify(novosDados));
      // Atualiza o estado local para refletir a remoção do cliente
      setClientes(novosDados);
    }
  }

  return (
    <Pagina titulo="Clientes"> {/* Componente 'Pagina' que provavelmente estrutura a página com um título */}
      {/* Botão para adicionar um novo cliente */}
      <Link href="/clientes/form" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo {/* Ícone de adicionar cliente */}
      </Link>

      {/* Tabela de clientes */}
      <Table striped bordered hover> {/* Tabela estilizada usando React-Bootstrap */}
        <thead>
          <tr>
            <th>Ações</th> {/* Coluna para as ações (editar e excluir) */}
            <th>ID</th> {/* Coluna para o ID do cliente */}
            <th>Nome</th> {/* Coluna para o nome do cliente */}
            <th>Documento</th> {/* Coluna para o tipo de documento do cliente */}
            <th>Email</th> {/* Coluna para o email do cliente */}
            <th>Telefone</th> {/* Coluna para o telefone do cliente */}
            <th>Data de Nascimento</th> {/* Coluna para a data de nascimento do cliente */}
          </tr>
        </thead>
        <tbody>
          {/* Mapeia a lista de clientes e cria uma linha para cada cliente */}
          {clientes.map((item, i) => (
            <tr key={item.id}> {/* Cada linha tem uma chave única 'id' */}
              <td>
                {/* Ações de editar e excluir */}
                <Link href={`/clientes/form/${item.id}`} className="me-2">
                  <FaRegEdit title="Editar" className="text-primary" /> {/* Ícone de editar */}
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger cursor-pointer"
                  onClick={() => excluir(item.id)} // Chama a função 'excluir' ao clicar no ícone de excluir
                />
              </td>
              {/* Exibe os dados do cliente nas colunas */}
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.documento}</td>
              <td>{item.email}</td>
              <td>{item.telefone}</td>
              <td>{item.data_nascimento}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
