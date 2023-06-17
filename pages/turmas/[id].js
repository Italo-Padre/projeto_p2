import Navegacao from '@/components/Navegacao'
import validatorTurmas from '@/validators/validatorTurmas'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { mask } from 'remask'

const alterar = () => {
    const { push, query } = useRouter()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [professores, setProfessores] = useState([])


    useEffect(() => {
        getAll()
    }, [])
    function getAll() {
        axios.get('/api/professores').then(resultado => {
            setProfessores(resultado.data)
        })
    }
    useEffect(() => {
        if (query.id) {
            axios.get('/api/turmas/' + query.id).then(resultado => {
                const professor = resultado.data

                for (let atributo in professor) {
                    setValue(atributo, professor[atributo])
                }
            })
        }
    }, [query.id])

    function salvar(dados) {
        axios.put('/api/turmas/' + dados.id, dados)
        push('/turmas')
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
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control isInvalid={errors.nome}
                                    {...register('nome', validatorTurmas.nome)}
                                    placeholder='Nome da Turma' type="text" />
                                {
                                    errors.nome &&
                                    <small>{errors.nome.message}</small>
                                }
                            </Form.Group>

                            <Form.Group>
                                <Form.Label >Professor</Form.Label>
                                <Form.Select isInvalid={errors.professor} {...register('professor', validatorTurmas.professor)} id="modalidade">
                                    {professores.map(item => (
                                        <option key={item.id}>{item.nome}-{item.modalidade}</option>
                                    ))}
                                </Form.Select>
                                {
                                    errors.professor &&
                                    <small>{errors.professor.message}</small>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label >Horario</Form.Label>
                                <Form.Select isInvalid={errors.horario} {...register('horario', validatorTurmas.horario)} id="horario">
                                    <option></option>
                                    <option value='manha' >Manhã</option>
                                    <option value='tarde' >Tarde</option>
                                    <option value='noite' >Noite</option>
                                </Form.Select>
                                {
                                    errors.horario &&
                                    <small>{errors.horario.message}</small>
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
            </Navegacao>
        </>
    )
}

export default alterar