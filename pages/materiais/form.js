import Navegacao from '@/components/Navegacao'
import validatorMaterial from '@/validators/validatorMaterial'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { mask } from 'remask'

const form = () => {
    const { push } = useRouter()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  function salvar(dados) {
    axios.post('/api/materiais', dados)
    push('/materiais')
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
              <Form.Group className="mb-3" controlId="tipo">
                <Form.Label>Tipo:</Form.Label>
                <Form.Control isInvalid={errors.tipo}
                  {...register('tipo', validatorMaterial.tipo)}
                  type="text" />
                {
                  errors.tipo &&
                  <small>{errors.tipo.message}</small>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="preco">
                <Form.Label>Preço:</Form.Label>
                <Form.Control isInvalid={errors.preco} {...register('descricao', validatorMaterial.preco)} type="text" />
                {
                  errors.preco &&
                  <small>{errors.preco.message}</small>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="data">
                <Form.Label>Data:</Form.Label>
                <Form.Control isInvalid={errors.imagem}
                             {...register('imagem', validatorMaterial.data)}
                              type="text" 
                              mask='99/99/9999'/>
                {
                  errors.data &&
                  <small>{errors.data.message}</small>
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

export default form