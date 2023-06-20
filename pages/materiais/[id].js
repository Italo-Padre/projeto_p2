import NavegacaoForm from '@/components/NavegacaoForm'
import validatorMaterial from '@/validators/validatorMaterial'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const alterar = () => {
    const {push, query} = useRouter()
    const {register, handleSubmit, setValue,formState:{errors}} = useForm ()
    const [esportes, setEsportes] = useState([])

    useEffect(() => {
        getAll()
    }, [])
    function getAll() {
        axios.get('/api/esportes').then(resultado => {
            setEsportes(resultado.data)
        })
    }
  
    useEffect(()=> {
      if(query.id){
        axios.get('/api/materiais/' + query.id).then(resultado=>{
          const materiais = resultado.data
  
          for(let atributo in materiais){
            setValue(atributo,materiais[atributo])
          }
         })
      }
    }, [query.id])
  
    function salvar(dados){
      axios.put('/api/materiais/' + dados.id, dados)
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
        <NavegacaoForm titulo='Materiais'>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="tipo">
                <Form.Label>Tipo:</Form.Label>
                <Form.Control isInvalid={errors.tipo}
                  {...register('tipo', validatorMaterial.tipo)}
                 placeholder='Tipo' type="text" />
                {
                  errors.tipo &&
                  <small>{errors.tipo.message}</small>
                }
              </Form.Group>

              <Form.Group>
                <Form.Label >Esporte</Form.Label>
                <Form.Select isInvalid={errors.esporte} {...register('esporte', validatorMaterial.esporte)} id="modalidade">
                  {esportes.map(item => (
                    <option key={item.id}>{item.nome}</option>
                  ))}
                </Form.Select>
                {
                  errors.esporte &&
                  <small>{errors.esporte.message}</small>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="preco">
                <Form.Label>Preço:</Form.Label>
                <Form.Control isInvalid={errors.preco}
                  {...register('preco', validatorMaterial.preco)}
                 placeholder='Preço' type="text" onChange={handleChange}
                  mask='R$ 999,99' />
                {
                  errors.preco &&
                  <small>{errors.preco.message}</small>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="data">
                <Form.Label>Data:</Form.Label>
                <Form.Control isInvalid={errors.data}
                  {...register('data', validatorMaterial.data)}
                placeholder='Data de Compra'  type="text"
                  onChange={handleChange}
                  mask='99/99/9999' />
                {
                  errors.data &&
                  <small>{errors.data.message}</small>
                }
              </Form.Group>
              <div className='text-center'>
              <Button onClick={handleSubmit(salvar)} variant="primary" type="submit">
                Salvar
              </Button>
            </div>
            </Form>
          </Card.Body>
        </Card>
        </NavegacaoForm>
    </>
  )
}

export default alterar