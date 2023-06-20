import Navegacao from '@/components/Navegacao'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Table } from 'react-bootstrap'

const index = () => {

    const [turmas, setTurmas] = useState([])
    const { push } = useRouter()
    const[busca,setBusca]= useState('')

    useEffect(() => {
      getAll()
    }, [])
    function getAll() {
      axios.get('/api/turmas').then(resultado => {
        setTurmas(resultado.data)
      })
    }
    function excluir(id) {
      if (confirm('Deseja realmente excluir?'))
        axios.delete('/api/turmas/' + id)
      getAll()
      push('/turmas')
  
    }
  
    const turmasFiltrados = turmas.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
        <Navegacao titulo='Turmas' value={busca} onChange={(ev) => setBusca(ev.target.value)}>
        <Button href={'/turmas/form'} className='mb-3' >Novo</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Professor/Modalidade</th>
             <th>Horario</th>
            </tr>
          </thead>
          <tbody>
            {turmasFiltrados.map(item => (
              <tr key={item.id}>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item href={'/turmas/' + item.id}>Alterar</Dropdown.Item>
                      <Dropdown.Item onClick={() => excluir(item.id)} >Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>{item.nome}</td>
                <td>{item.professor}</td>
                <td>{item.horario}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Navegacao>
    </>
  )
}

export default index