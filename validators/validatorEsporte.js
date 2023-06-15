const validatorEsporte = {
    nome:{
        required:'Este campo é obrigatório',
        minLength:{
            value: 3,
            message: 'Minimo 3 caracteres'
          }
    },
    descricao:{
        required:'Este campo é obrigatório',
    },
    imagem:{
        required:'Este campo é obrigatório',
    },
    preco:{
        required:'Este campo é obrigatório',
    }
}
export default validatorEsporte