const validatorTurmas = {
    nome:{
        required:'Este campo é obrigatório',
        minLength:{
            value: 3,
            message: 'Minimo 3 caracteres'
          }
    },
    professor:{
        required:'Este campo é obrigatório',
    },
    horario:{
        required:'Este campo é obrigatório',
    }
}

export default validatorTurmas