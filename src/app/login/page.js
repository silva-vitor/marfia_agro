'use client'; // Indica que este componente é renderizado no lado do cliente em um ambiente Next.js

import { Formik } from "formik"; // Importa o Formik, que facilita o gerenciamento de formulários em React
import Link from "next/link"; // Importa o componente Link do Next.js para navegação entre páginas
import { useRouter } from "next/navigation"; // Importa o hook useRouter para navegação entre páginas
import { Button, Form, Container } from "react-bootstrap"; // Componentes do Bootstrap para estilização do formulário
import { FaTractor } from "react-icons/fa6"; // Ícone de trator utilizado para o botão de login
import { TiArrowBack } from "react-icons/ti"; // Ícone de seta usado no botão de voltar
import { useEffect, useState } from "react"; // useEffect e useState para manipulação de estado e efeitos colaterais

export default function Page() {
    const route = useRouter(); // Inicializa o hook de navegação para redirecionar após login
    const [funcionarios, setFuncionarios] = useState([]); // Estado para armazenar a lista de funcionários

    // Função para adicionar o usuário administrador padrão ao localStorage
    function adicionarAdmin() {
        const admin = {
            id: "1",
            nome: "vitor",
            email: "vp986788@gmail.com",
            senha: "270420",
            telefone: "123456789",
        };

        // Busca os funcionários já armazenados no localStorage ou inicializa como um array vazio
        const storedFuncionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        
        // Verifica se o administrador já existe
        const adminExiste = storedFuncionarios.some(func => func.email === admin.email);

        // Se o administrador não existir, ele é adicionado
        if (!adminExiste) {
            storedFuncionarios.push(admin); // Adiciona o administrador à lista
            localStorage.setItem('funcionarios', JSON.stringify(storedFuncionarios)); // Salva no localStorage
            console.log("Administrador adicionado com sucesso!");
        }
    }

    // useEffect é utilizado para adicionar o administrador e carregar a lista de funcionários no início
    useEffect(() => {
        adicionarAdmin(); // Adiciona o administrador padrão, se necessário

        // Carrega os funcionários do localStorage
        const storedFuncionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        setFuncionarios(storedFuncionarios); // Atualiza o estado com a lista de funcionários
    }, []); // O array vazio [] faz com que esse efeito seja executado apenas uma vez após o primeiro render

    // Função para autenticar o usuário com as credenciais fornecidas
    function autenticar(dados) {
        // Verifica se existe um funcionário com o email e senha fornecidos
        const funcionarioEncontrado = funcionarios.find(
            (func) => func.email === dados.email && func.senha === dados.senha
        );

        // Se o funcionário for encontrado, o login é bem-sucedido
        if (funcionarioEncontrado) {
            localStorage.setItem("isAuthenticated", "true"); // Salva o estado de autenticação no localStorage
            alert("Login bem-sucedido!"); // Exibe mensagem de sucesso
            route.push("/produtos"); // Redireciona para a página de produtos
        } else {
            alert("Credenciais inválidas. Tente novamente."); // Exibe mensagem de erro
        }
    }

    return (
        <>
            {/* Container para centralizar o formulário de login com uma imagem de fundo */}
            <Container
                fluid
                className="d-flex justify-content-center align-items-center vh-100"
                style={{
                    backgroundImage: "url('https://i.ytimg.com/vi/9v8tB27etk4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCnJ1QpWj_6hs20iTlJ5HplMai_ig')", // URL da imagem de fundo
                    backgroundSize: 'cover', // A imagem cobre toda a área
                    backgroundPosition: 'center', // A imagem é centralizada
                    backgroundRepeat: 'no-repeat', // A imagem não se repete
                }}
            >
                {/* Caixa contendo o formulário de login */}
                <div className="border p-4 rounded shadow bg-light" style={{ maxWidth: '400px', width: '100%' }}>
                    
                    {/* Logo centralizada */}
                    <div className="text-center mb-4">
                        <img
                            src="https://yt3.googleusercontent.com/6c_rKkbSUGia02avdrtRArFxfaiJq8Uu1-3oyzR3KUGWBKD8g5NHDXB60pNRcJoSxSrS4qvUfQ=s900-c-k-c0x00ffffff-no-rj" // URL da logo
                            alt="Logo"
                            style={{ width: '50px' }} // Definindo o tamanho da logo
                        />
                    </div>

                    {/* Formulário de Login utilizando Formik para gerenciar o estado e validação */}
                    <Formik
                        initialValues={{ email: '', senha: '' }} // Valores iniciais do formulário
                        onSubmit={autenticar} // Função que será chamada ao enviar o formulário
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                {/* Campo de Email */}
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                    />
                                </Form.Group>

                                {/* Campo de Senha */}
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

                                {/* Botão de Login */}
                                <Button type="submit" variant="success" className="w-100 mb-3">
                                    <FaTractor /> Logar
                                </Button>

                                {/* Link para retornar à página inicial */}
                                <Link href="/" className="btn btn-danger w-100">
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
