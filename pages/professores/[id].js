import NavegacaoForm from '@/components/NavegacaoForm'
import validatorProfessor from '@/validators/validatorProfessor'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { mask } from 'remask';

const alterar = () => {
    const { push, query } = useRouter()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [esportes, setEsportes] = useState([])

    useEffect(() => {
        getAll()
    }, [])
    function getAll() {
        axios.get('/api/esportes').then(resultado => {
            setEsportes(resultado.data)
        })
    }

    useEffect(() => {
        if (query.id) {
            axios.get('/api/professores/' + query.id).then(resultado => {
                const professor = resultado.data

                for (let atributo in professor) {
                    setValue(atributo, professor[atributo])
                }
            })
        }
    }, [query.id])

    function salvar(dados) {
        axios.put('/api/professores/' + dados.id, dados)
        push('/professores')
    }
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        const mascara = (event.target.getAttribute('mask'))
        setValue(name, mask(value, mascara))
    }
    return (
        <>
            <NavegacaoForm titulo='Professores'>
                <Card>
                    <Card.Body>

                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control isInvalid={errors.nome}
                                    {...register('nome', validatorProfessor.nome)}
                                    placeholder='Nome' type="text" />
                                {
                                    errors.nome &&
                                    <small>{errors.nome.message}</small>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label >Modalidade</Form.Label>
                                <Form.Select isInvalid={errors.modalidade}
                                    {...register('modalidade', validatorProfessor.modalidade)} id="modalidade">
                                    {esportes.map(item => (
                                        <option key={item.id}>{item.nome}</option>
                                    ))}
                                </Form.Select>
                                {
                                    errors.modalidade &&
                                    <small>{errors.modalidade.message}</small>
                                }
                            </Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="cpf">
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control isInvalid={errors.cpf}
                                            {...register('cpf', validatorProfessor.cpf)}
                                            type="text" placeholder="CPF"
                                            onChange={handleChange}
                                            mask='999.999.999-99' />
                                        {
                                            errors.cpf &&
                                            <small>{errors.cpf.message}</small>
                                        }
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="telefone">
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control isInvalid={errors.telefone}
                                            {...register('telefone', validatorProfessor.telefone)}
                                            type="text" placeholder="Telefone"
                                            onChange={handleChange}
                                            mask='(99) 99999-9999' />
                                        {
                                            errors.telefone &&
                                            <small>{errors.telefone.message}</small>
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="salario">
                                        <Form.Label>Salario</Form.Label>
                                        <Form.Control isInvalid={errors.salario}
                                            {...register('salario', validatorProfessor.salario)}
                                            type="text" placeholder="salario"
                                            onChange={handleChange}
                                            mask='R$ 9.999,99' />
                                        {
                                            errors.salario &&
                                            <small>{errors.salario.message}</small>
                                        }
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="cep">
                                        <Form.Label>CEP</Form.Label>
                                        <Form.Control isInvalid={errors.cep}
                                            {...register('cep', validatorProfessor.cep)}
                                            type="text" placeholder="CEP"
                                            onChange={handleChange}
                                            mask='99999-999' />
                                        {
                                            errors.cep &&
                                            <small>{errors.cep.message}</small>
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
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