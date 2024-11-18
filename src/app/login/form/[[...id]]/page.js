'use client'; // Indica que este código é executado no lado do cliente em um ambiente Next.js.

import React, { useState } from 'react'; // Importa o React e o hook useState para gerenciar o estado local
import { useRouter } from 'next/navigation'; // Importa o hook useRouter do Next.js para navegação entre páginas
import { Form, Button } from 'react-bootstrap'; // Importa componentes do React-Bootstrap para a interface de formulário

export default function Login() {
  // Estado para armazenar as credenciais de login (login e senha)
  const [credenciais, setCredenciais] = useState({ login: '', senha: '' });
  const router = useRouter(); // Inicializa o hook de navegação

  // Função para atualizar o estado das credenciais quando o usuário digitar no formulário
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestrutura os valores 'name' e 'value' do input
    // Atualiza o estado, mantendo o valor atual e modificando a chave correspondente ao 'name'
    setCredenciais({ ...credenciais, [name]: value });
  };

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede que o formulário recarregue a página

    // Recupera os clientes do localStorage (ou um array vazio, caso não existam dados)
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    // Verifica se há um cliente com as credenciais fornecidas (login e senha)
    const usuario = clientes.find(
      u => u.login === credenciais.login && u.senha === credenciais.senha
    );

    // Se o usuário for encontrado, realiza o login
    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario)); // Armazena o usuário logado no localStorage
      // Se o tipo de usuário for 'admin', redireciona para a área administrativa
      if (usuario.tipo === 'admin') {
        router.push('/login/produtos'); // Redireciona para página de administração de produtos
      } else {
        router.push('/login/cliente'); // Redireciona para página do cliente
      }
    } else {
      alert('Credenciais inválidas'); // Exibe um alerta se as credenciais forem inválidas
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Formulário de login */}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label> {/* Rótulo do campo de e-mail */}
        <Form.Control
          type="email"
          name="login" // O nome é 'login', que será usado para armazenar no estado
          value={credenciais.login} // O valor é o estado 'login'
          onChange={handleChange} // Chama handleChange quando o usuário digitar algo
          required // Campo obrigatório
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Senha</Form.Label> {/* Rótulo do campo de senha */}
        <Form.Control
          type="password"
          name="senha" // O nome é 'senha', que será usado para armazenar no estado
          value={credenciais.senha} // O valor é o estado 'senha'
          onChange={handleChange} // Chama handleChange quando o usuário digitar algo
          required // Campo obrigatório
        />
      </Form.Group>

      {/* Botão de envio do formulário */}
      <Button type="submit">Entrar</Button>
    </Form>
  );
}
