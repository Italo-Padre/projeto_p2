import { useRouter } from 'next/router'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import Navegacao from '@/components/Navegacao';
import validatorEsporte from '@/validators/validatorEsporte';
import { mask } from 'remask';

const form = () => {
  const { push } = useRouter()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  function salvar(dados) {
    axios.post('/api/esportes', dados)
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

export default form