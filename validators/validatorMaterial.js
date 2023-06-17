const validatorMaterial = {
    tipo:{
        required:'Este campo é obrigatório',
        minLength:{
            value: 3,
            message: 'Minimo 3 caracteres'
          }
    },
    preco:{
        required:'Este campo é obrigatório',
    },
    data:{
        required:'Este campo é obrigatório',
    },
    esporte:{
        required:'Este campo é obrigatório',
    }
    
}
export default validatorMaterial