'use client'; // Indica que este código é executado no lado do cliente (em Next.js)

import Pagina from "@/components/Pagina"; // Importa o componente 'Pagina' que provavelmente estrutura a página
import { Formik } from "formik"; // Importa o Formik, que facilita o gerenciamento de formulários
import Link from "next/link"; // Importa o Link do Next.js para navegação entre páginas
import { useRouter } from "next/navigation"; // Importa o hook useRouter para manipulação da navegação
import { useEffect } from "react"; // Importa o useEffect para efeitos colaterais (ações baseadas em mudanças de estado)
import { Button, Form } from "react-bootstrap"; // Importa componentes de UI do React-Bootstrap
import { FaCheck } from "react-icons/fa"; // Importa o ícone de 'check' (checkmark)
import { MdOutlineArrowBack } from "react-icons/md"; // Importa o ícone de 'voltar' (seta)
import { mask } from "remask"; // Importa funções de máscara de campos de entrada (como CPF, telefone)
import { v4 } from "uuid"; // Importa a função v4 para gerar IDs únicos
import * as Yup from "yup"; // Importa o Yup para validação

// Definindo o validador do Formik com o Yup
const ClienteValidador = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    telefone: Yup.string().required('Telefone é obrigatório'),
    documento: Yup.string().required('Documento é obrigatório'),
    tipo_documento: Yup.string().required('Tipo de documento é obrigatório'),
    data_nascimento: Yup.string().required('Data de nascimento é obrigatória')
});

export default function Page({ params }) {

    const route = useRouter(); // Hook para navegação programática (como redirecionar para outra página)

    // Carrega a lista de clientes do localStorage ou cria uma lista vazia se não existir
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    
    // Encontra os dados do cliente com o ID passado como parâmetro
    const dados = clientes.find(item => item.id == params.id);
    
    // Se o cliente não for encontrado, cria um objeto vazio com os campos iniciais
    const cliente = dados || { nome: '', email: '', telefone: '', data_nascimento: '', tipo_documento: '', documento: '' };

    // Função para salvar ou atualizar o cliente
    function salvar(dados) {

        // Se o cliente já tiver ID (caso de edição), atualiza os dados
        if (cliente.id) {
            Object.assign(cliente, dados);
        } else {
            // Se for um novo cliente, gera um ID único e adiciona na lista
            dados.id = v4();
            clientes.push(dados);
        }

        // Salva os dados atualizados no localStorage
        localStorage.setItem('clientes', JSON.stringify(clientes));
        
        // Redireciona o usuário para a página de clientes após salvar
        return route.push('/clientes');
    }

    return (
        <Pagina titulo="Cliente"> {/* Componente Pagina com o título "Cliente" */}
        
            {/* Formik para gerenciar o formulário, com valores iniciais passados pelo cliente */}
            <Formik
                initialValues={cliente} // Dados iniciais do cliente (usado para editar ou criar)
                validationSchema={ClienteValidador}  // Passando o validador para o Formik
                onSubmit={values => salvar(values)} // Ao submeter, chama a função salvar
            >
                {({
                    values, // Valores do formulário
                    handleChange, // Função que lida com mudanças de valor nos campos
                    handleSubmit, // Função que lida com o envio do formulário
                    setFieldValue, // Função para atualizar o valor de um campo específico
                    errors, // Erros de validação
                    touched, // Verifica se o campo foi tocado
                }) => {

                    // Efeito para mascarar o campo 'documento' baseado no tipo de documento
                    useEffect(() => {
                        switch (values.tipo_documento) {
                            case 'CPF':
                                setFieldValue('documento', mask(values.documento, '999.999.999-99')); // Mascara para CPF
                                break;
                            case 'CNPJ':
                                setFieldValue('documento', mask(values.documento, '99.999.999/9999-99')); // Mascara para CNPJ
                                break;
                            case 'RG':
                                setFieldValue('documento', mask(values.documento, '9.999.999')); // Mascara para RG
                                break;
                            case 'Passaporte':
                                setFieldValue('documento', mask(values.documento, 'AAA9999')); // Mascara para Passaporte
                                break;
                            default:
                                setFieldValue('documento', values.documento);
                        }
                    }, [values.tipo_documento, values.documento, setFieldValue]);

                    return (
                        <Form>
                            {/* Formulário com campos para nome, tipo de documento, documento, email, telefone e data de nascimento */}
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange} // Atualiza o valor do nome
                                    isInvalid={touched.nome && !!errors.nome}
                                />
                                {touched.nome && errors.nome && <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tipo_documento">
                                <Form.Label>Tipo de Documento</Form.Label>
                                <Form.Select
                                    name="tipo_documento"
                                    value={values.tipo_documento}
                                    onChange={handleChange} // Atualiza o tipo de documento
                                    isInvalid={touched.tipo_documento && !!errors.tipo_documento}
                                >
                                    <option value=''>Selecione</option>
                                    <option value='CPF'>CPF</option>
                                    <option value='CNPJ'>CNPJ</option>
                                    <option value='RG'>RG</option>
                                    <option value='Passaporte'>Passaporte</option>
                                    <option value='Outro'>Outro</option>
                                </Form.Select>
                                {touched.tipo_documento && errors.tipo_documento && <Form.Control.Feedback type="invalid">{errors.tipo_documento}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="documento">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="documento"
                                    value={values.documento}
                                    onChange={handleChange} // Atualiza o valor do documento
                                    isInvalid={touched.documento && !!errors.documento}
                                />
                                {touched.documento && errors.documento && <Form.Control.Feedback type="invalid">{errors.documento}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange} // Atualiza o valor do email
                                    isInvalid={touched.email && !!errors.email}
                                />
                                {touched.email && errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(value) => {
                                        setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999')); // Aplica a máscara no telefone
                                    }}
                                    isInvalid={touched.telefone && !!errors.telefone}
                                />
                                {touched.telefone && errors.telefone && <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="data_nascimento">
                                <Form.Label>Dt Nascimento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="data_nascimento"
                                    value={values.data_nascimento}
                                    onChange={(value) => {
                                        setFieldValue('data_nascimento', mask(value.target.value, '99/99/9999')); // Aplica a máscara na data de nascimento
                                    }}
                                    isInvalid={touched.data_nascimento && !!errors.data_nascimento}
                                />
                                {touched.data_nascimento && errors.data_nascimento && <Form.Control.Feedback type="invalid">{errors.data_nascimento}</Form.Control.Feedback>}
                            </Form.Group>
                            {/* Botões para salvar e voltar */}
                            <div className="text-center">
                                <Button 
                                    onClick={handleSubmit} 
                                    variant="success" 
                                    
                                >
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/clientes"
                                    className="btn btn-danger ms-2"
                                >
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
