import Navegacao from '@/components/Navegacao'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Dropdown, Table } from 'react-bootstrap'

const index = () => {
    const [alunos, setAlunos] = useState([])

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
  
    }
  return (
    <>
      <Navegacao>
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
        {alunos.map(item=>(
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