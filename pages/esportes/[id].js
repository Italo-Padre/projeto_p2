import Navegacao from '@/components/Navegacao'
import validatorEsporte from '@/validators/validatorEsporte'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { mask } from 'remask'

const alterar = () => {
    
        const {push, query} = useRouter()
        const {register, handleSubmit, setValue,formState:{errors}} = useForm ()
      
        useEffect(()=> {
          if(query.id){
            axios.get('/api/esportes/' + query.id).then(resultado=>{
              const esporte = resultado.data
      
              for(let atributo in esporte){
                setValue(atributo,esporte[atributo])
              }
             })
      
          }
        }, [query.id])
      
        function salvar(dados){
          axios.put('/api/esportes/' + dados.id, dados)
          push('/esportes')
        }
        function handleChange(event) {

          const name = event.target.name
          const value = event.target.value
          const mascara = (event.target.getAttribute('mask'))
          setValue(name, mask(value, mascara))
        }
  return (
    <>
        <Navegacao>

        <Card>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome:</Form.Label>
                <Form.Control isInvalid={errors.nome}
                  {...register('nome', validatorEsporte.nome)}
                  type="text" />
                {
                  errors.nome &&
                  <small>{errors.nome.message}</small>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Descrição:</Form.Label>
                <Form.Control isInvalid={errors.descricao} {...register('descricao', validatorEsporte.descricao)} type="text" />
                {
                  errors.descricao &&
                  <small>{errors.descricao.message}</small>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="duracao">
                <Form.Label>Imagem:</Form.Label>
                <Form.Control isInvalid={errors.imagem} {...register('imagem', validatorEsporte.imagem)} type="text" />
                {
                  errors.imagem &&
                  <small>{errors.imagem.message}</small>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="duracao">
                <Form.Label>Preço:</Form.Label>
                <Form.Control
                  isInvalid={errors.preco}
                  {...register('preco', validatorEsporte.preco)}
                  type="text"
                  mask='R$ 999,99'
                  onChange={handleChange} />
                {
                  errors.preco &&
                  <small>{errors.preco.message}</small>
                }
              </Form.Group>

              <Button onClick={handleSubmit(salvar)} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
</Navegacao>
    </>
  )
}

export default alterar