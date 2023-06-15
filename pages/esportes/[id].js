import Navegacao from '@/components/Navegacao'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const alterar = () => {
    
        const {push, query} = useRouter()
        const {register, handleSubmit, setValue} = useForm ()
      
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
    
  return (
    <>
        <Navegacao>

<Form>
  <Form.Group className="mb-3" controlId="nome">
    <Form.Label>Nome:</Form.Label>
    <Form.Control {...register('nome')} type="text" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="nome">
    <Form.Label>Descrição:</Form.Label>
    <Form.Control {...register('descricao')} type="text" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="duracao">
    <Form.Label>Imagem:</Form.Label>
    <Form.Control {...register('imagem')} type="text" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="duracao">
    <Form.Label>Preço:</Form.Label>
    <Form.Control {...register('preco')} type="text" />
  </Form.Group>
  <Button onClick={handleSubmit(salvar)} variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Navegacao>
    </>
  )
}

export default alterar