import Navegacao from '@/components/Navegacao'
import validatorAluno from '@/validators/validatorAluno'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Offcanvas, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { mask } from 'remask'

const form = () => {
    const { push } = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [esportes, setEsportes] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        getAll()
    }, [])
    function getAll() {
        axios.get('/api/esportes').then(resultado => {
            setEsportes(resultado.data)
        })
    }

    function salvar(dados) {
        axios.post('/api/alunos', dados)
        push('/alunos')
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
                                    {...register('nome', validatorAluno.nome)}
                                    placeholder='Nome' type="text" />
                                {
                                    errors.nome &&
                                    <small>{errors.nome.message}</small>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label >Modalidade</Form.Label>
                                <Form.Select isInvalid={errors.modalidade} {...register('modalidade', validatorAluno.modalidade)} id="modalidade">
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
                                            {...register('cpf', validatorAluno.cpf)}
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
                                            {...register('telefone', validatorAluno.telefone)}
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
                                    <Form.Group className="mb-3" controlId="data">
                                        <Form.Label>Data de Nascimento:</Form.Label>
                                        <Form.Control isInvalid={errors.data}
                                            {...register('data', validatorAluno.data)}
                                            type="text" placeholder="Data de Nascimento"
                                            onChange={handleChange}
                                            mask='99/99/9999' />
                                        {
                                            errors.data &&
                                            <small>{errors.data.message}</small>
                                        }
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="cep">
                                        <Form.Label>CEP</Form.Label>
                                        <Form.Control isInvalid={errors.cep}
                                            {...register('cep', validatorAluno.cep)}
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
                            <Button className='m-2' onClick={handleSubmit(salvar)} variant="primary" type="submit">
                                Salvar
                            </Button>
                            <Button className='m-2' variant="primary" onClick={handleShow}>
                                Ver Preços
                            </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Tabela de Preços</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {esportes.map(item => (
                            <li>{item.nome}-{item.preco}</li>
                        ))}
                    </Offcanvas.Body>
                </Offcanvas>
            </Navegacao>
        </>
    )
}

export default form