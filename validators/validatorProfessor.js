const validatorProfessor = {
    nome:{
        required:'Este campo é obrigatório',
        minLength:{
            value: 4,
            message: 'Minimo 3 caracteres'
          }
    },
    cpf:{
        required:'O campo é obrigátorio',
       
         
          minLength:{
            value: 11,
            message: 'Insira um CPF valido'
          }
      },
      telefone:{
        required:'O campo é obrigátorio',
    
        minLength:{
          value: 8,
          message: 'Insira um telefone valido'
        }
      },
    salario:{
        required:'Este campo é obrigatório',
    },
    cep:{
        required:'Este campo é obrigatório',
    },
    modalidade:{
        required:'Este campo é obrigatório',
    }
}
export default validatorProfessor