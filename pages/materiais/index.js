import Navegacao from '@/components/Navegacao'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Table } from 'react-bootstrap'

const index = () => {
  const [materiais, setMateriais] = useState([])

  useEffect(() => {
    getAll()
  }, [])
  function getAll() {
    axios.get('/api/materiais').then(resultado => {
      setMateriais(resultado.data)
    })
  }
  function excluir(id) {
    if (confirm('Deseja realmente excluir?'))
      axios.delete('/api/materiais/' + id)
    getAll()

  }

  return (
    <>
      <Navegacao>
      <Button href={'/materiais/form'} className='mb-3' >Novo</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Esporte</th>
              <th>Preço</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {materiais.map(item => (
              <tr key={item.id}>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item href={'/materiais/' + item.id}>Alterar</Dropdown.Item>
                      <Dropdown.Item onClick={() => excluir(item.id)} >Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>{item.tipo}</td>
                <td>{item.esporte}</td>
                <td>{item.preco}</td>
                <td>{item.data}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Navegacao>
    </>
  )
}

export default index