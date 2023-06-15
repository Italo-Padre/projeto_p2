import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardGroup, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navegacao from '@/components/Navegacao';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const index = () => {


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

  return (
    <>
      <Navegacao>
      <Button href={'/esportes/form'} className='mb-3' >Novo</Button>
          {esportes.map(item => (
        <CardGroup className="bg-success text-white m-2">
            <Card  >   
                <Card.Body>
                  <Card.Title>{item.nome}</Card.Title>
                  <Card.Text>
                    {item.descricao}<br></br>
                    {item.preco}
                  </Card.Text>
                  <Dropdown as={ButtonGroup}>
                    <Button variant="success">Split Button</Button>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item href={'/esportes/' + item.id}>Alterar</Dropdown.Item>
                      <Dropdown.Item onClick={() => excluir(item.id)} >Excluir</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
              </Card>  
            <Card  >   
                <Card.Body>
                <Card.Img  alt="Card image" title={item.nome} src={item.imagem} />  
                </Card.Body>
              </Card>  
          </CardGroup>   
          ))}
      </Navegacao>
    </>
  )
}

export default index