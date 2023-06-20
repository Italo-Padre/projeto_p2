import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardGroup, Col, Dropdown, Form, Row } from 'react-bootstrap'
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
      <Navegacao value={busca} onChange={(ev) => setBusca(ev.target.value)}>

        <Row md={4}>

          {esportesFiltrados.map(item => (
            
        <CardGroup>
                <Card style={{ width: '18rem' }} className= "text-center m-2">
                  <Card.Body>
                  <Card.Img  src={item.imagem} alt="Card image" />
                  <Card.Title>{item.nome}</Card.Title>
                  <p>

                    {item.descricao}
                  </p>
                
                  <Card.Text>{item.preco}</Card.Text>
                  <Button href='/esportes' >Configurar</Button>
                  </Card.Body>
                </Card>
            
        </CardGroup>
              
          ))}
        </Row>
        
        <div className="d-grid mb-5 gap-2">
          <Button href='/alunos/form' variant="primary" size="lg">
            Matricule-se Já
          </Button>
        </div>
      </Navegacao>
    </>
  )
}

export default index