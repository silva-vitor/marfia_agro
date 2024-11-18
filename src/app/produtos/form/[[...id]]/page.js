'use client'; // Indica que este é um componente que roda no lado do cliente

import { Formik } from "formik"; // Importa o Formik para gerenciamento de formulários
import Link from "next/link"; // Importa o componente de navegação do Next.js
import { useRouter } from "next/navigation"; // Importa o hook de navegação do Next.js
import { Button, Form } from "react-bootstrap"; // Importa componentes do Bootstrap
import { GiPlantWatering } from "react-icons/gi"; // Ícone de regador de plantas
import { TiArrowBack } from "react-icons/ti"; // Ícone de seta para voltar
import { v4 as uuidv4 } from "uuid"; // Gera IDs únicos
import Pagina from "@/components/Pagina"; // Componente de layout para envolver o conteúdo

export default function Page({ params }) {
    const route = useRouter(); // Hook de navegação

    // Carrega os produtos do localStorage
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    
    // Busca o produto a ser editado com base no ID na URL
    const dados = produtos.find(item => item.id == params.id);
    
    // Se o produto não for encontrado, cria um produto vazio
    const produto = dados || { imagem: '', nome: '', validade: '', descrição: '', lote: '', valor: '' };

    // Função para salvar ou atualizar o produto no localStorage
    function salvar(dados) {
        if (produto.id) {
            // Se o produto já existe, atualiza os dados
            Object.assign(produto, dados);
        } else {
            // Se for um novo produto, gera um ID e adiciona à lista
            dados.id = uuidv4();
            produtos.push(dados);
        }
        // Salva os produtos no localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));
        
        // Redireciona para a página de produtos
        route.push('/produtos');
    }

    return (
        <Pagina titulo="Produto"> {/* Componente de layout para a página */}
            <Formik
                initialValues={produto} // Define os valores iniciais do formulário
                onSubmit={values => salvar(values)} // Função chamada ao submeter o formulário
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <Form onSubmit={handleSubmit}> {/* Formulário de entrada de dados */}
                        {/* Campo de imagem */}
                        <Form.Group className="mb-3" controlId="imagem">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="file"
                                name="imagem"
                                accept=".jpg, .jpeg, .png, .gif, .bmp"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    // Verifica o tamanho da imagem (máximo 2 MB)
                                    if (file && file.size > 2 * 1024 * 1024) { // Limite de 2 MB
                                        alert("A imagem deve ter no máximo 2 MB");
                                        return;
                                    }

                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFieldValue("imagem", reader.result); // Define a URL da imagem
                                    };
                                    if (file) {
                                        reader.readAsDataURL(file); // Lê o arquivo como URL
                                    }
                                }}
                            />
                            {/* Exibe a pré-visualização da imagem */}
                            {values.imagem && (
                                <img
                                    src={values.imagem}
                                    alt="Pré-visualização"
                                    style={{
                                        width: '200px',  // Largura da imagem
                                        height: '200px', // Altura da imagem
                                        objectFit: 'cover', // Ajusta a imagem para cobrir o espaço
                                        marginTop: '10px'
                                    }}
                                />
                            )}
                        </Form.Group>

                        {/* Outros campos do formulário */}
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
                                type="date"
                                name="validade"
                                value={values.validade}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descrição">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
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
                                type="text"
                                name="valor"
                                value={values.valor}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Botões de ação */}
                        <div className="text-center">
                            <Button type="submit" variant="success">
                                <GiPlantWatering /> Salvar
                            </Button>
                            <Link href="/produtos" className="btn btn-danger ms-2">
                                <TiArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
