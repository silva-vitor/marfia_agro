import * as Yup from 'yup';

const ProdutoValidador = Yup.object().shape({
  imagem: Yup.string().required('A imagem é obrigatória'),
  nome: Yup.string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  validade: Yup.date()
    .required('A validade é obrigatória')
    .min(new Date(), 'A validade não pode ser uma data passada'),
  descrição: Yup.string()
    .required('A descrição é obrigatória')
    .max(500, 'A descrição não pode ter mais de 500 caracteres'),
  lote: Yup.string()
    .required('O lote é obrigatório')
    .matches(/^[A-Za-z0-9]+$/, 'O lote deve conter apenas letras e números'),
  valor: Yup.number()
    .typeError('O valor deve ser um número')
    .required('O valor é obrigatório')
    .positive('O valor deve ser positivo')
    .max(10000, 'O valor não pode ser superior a R$ 10.000')
});

export default ProdutoValidador;