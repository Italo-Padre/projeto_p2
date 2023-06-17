import Navegacao from '@/components/Navegacao'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Table } from 'react-bootstrap'

const index = () => {
    const [alunos, setAlunos] = useState([])
    const { push } = useRouter()
    const [busca, setBusca] = useState('')

    useEffect(() => {
      getAll()
    }, [])
    function getAll() {
      axios.get('/api/alunos').then(resultado => {
        setAlunos(resultado.data)
      })
    }
    function excluir(id) {
      if (confirm('Deseja realmente excluir?'))
        axios.delete('/api/alunos/' + id)
      getAll()
      push('/alunos')
    }
    const alunosFiltrados = alunos.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <Navegacao>
        <Button href={'/alunos/form'} className='mb-3' >Novo</Button>
        <Form.Control type='text' className='mb-2' placeholder='Busca' value={busca} onChange={(ev) => setBusca(ev.target.value)}></Form.Control>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Configuração</th>
          <th>Nome</th>
          <th>Modalidade</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>CEP</th>
        </tr>
      </thead>
      <tbody>
        {alunosFiltrados.map(item=>(
        <tr key={item.id}>
          <td>
            <Dropdown>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item href={'/alunos/' + item.id}>Alterar</Dropdown.Item>
                      <Dropdown.Item onClick={() => excluir(item.id)} >Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
          </td>
          <td>{item.nome}</td>
          <td>{item.modalidade}</td>
          <td>{item.cpf}</td>
          <td>{item.telefone}</td>
          <td>{item.cep}</td>
        </tr>
        ))}
 
      </tbody>
    </Table>
        </Navegacao>
    </>
  )
}

export default index