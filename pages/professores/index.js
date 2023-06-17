import Navegacao from '@/components/Navegacao'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Table } from 'react-bootstrap'

const index = () => {
    const [professores, setProfessores] = useState([])
    const { push } = useRouter()
    const [busca, setBusca] = useState('')

    useEffect(() => {
      getAll()
    }, [])
    function getAll() {
      axios.get('/api/professores').then(resultado => {
        setProfessores(resultado.data)
      })
    }
    function excluir(id) {
      if (confirm('Deseja realmente excluir?'))
        axios.delete('/api/professores/' + id)
      getAll()
      push('/professores')
    }
  
    const professoresFiltrados = professores.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
        <Navegacao>
        <Button href={'/professores/form'} className='mb-3' >Novo</Button>
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
          <th>Salario</th>
        </tr>
      </thead>
      <tbody>
        {professoresFiltrados.map(item=>(
        <tr key={item.id}>
          <td>
            <Dropdown>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item href={'/professores/' + item.id}>Alterar</Dropdown.Item>
                      <Dropdown.Item onClick={() => excluir(item.id)} >Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
          </td>
          <td>{item.nome}</td>
          <td>{item.modalidade}</td>
          <td>{item.cpf}</td>
          <td>{item.telefone}</td>
          <td>{item.cep}</td>
          <td>{item.salario}</td>
        </tr>
        ))}
 
      </tbody>
    </Table>
        </Navegacao>
    </>
  )
}

export default index