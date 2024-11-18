import * as Yup from 'yup';

const ClienteValidador = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'O mínimo de caracteres é 3')
    .max(100, 'O máximo de caracteres é 100')
    .required('Campo obrigatório'),
  
  tipo_documento: Yup.string()
    .required('Campo obrigatório'),

  documento: Yup.string()
    .required('Campo obrigatório'),

  email: Yup.string()
    .email('Formato de e-mail inválido')
    .required('Campo obrigatório'),

  telefone: Yup.string()
    .required('Campo obrigatório'),

  data_nascimento: Yup.string()
    .required('Campo obrigatório'),
});

export default ClienteValidador;
