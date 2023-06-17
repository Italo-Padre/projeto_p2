import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardImg, Col, Dropdown, Form, Row, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navegacao from '@/components/Navegacao';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const index = () => {

  const [busca, setBusca] = useState('')
  const [esportes, setEsportes] = useState([])
  
  useEffect(() => {
    getAll()
  }, [])
  function getAll() {
    axios.get('/api/esportes').then(resultado => {
      setEsportes(resultado.data)
    })
  }
  function excluir(id) {
    if (confirm('Deseja realmente excluir?'))
    axios.delete('/api/esportes/' + id)
    getAll()
    
  }
  
  function excluir(id) {
    if (confirm('Deseja realmente excluir?'))
    axios.delete('/api/esportes/' + id)
    getAll()
    
  }
  
  const esportesFiltrados = esportes.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));
  return (
    <>
      <Navegacao> 
      <Button href={'/esportes/form'} className='mb-3' >Novo</Button>  
                <Form.Control type='text' className='mb-2' placeholder='Busca' value={busca} onChange={(ev) => setBusca(ev.target.value)}></Form.Control>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>Configuração</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {esportesFiltrados.map(item => (
              <tr key={item.id}>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item href={'/esportes/' + item.id}>Alterar</Dropdown.Item>
                      <Dropdown.Item onClick={() => excluir(item.id)} >Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <Card.Img src={item.imagem}/>
                </td>
                <td>{item.nome}</td>
                <td>{item.preco}</td>
                <td>{item.descricao}</td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      </Navegacao>
    </>
  )
}

export default index