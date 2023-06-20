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
        <Row md={4} className="g-4">
          {esportesFiltrados.map(item => (
    
            <CardGroup>
                <Card style={{ width: '18rem' }}>
                  <Card.Img  variant="top" src={item.imagem} />
                  <Card.Body>
                    <Card.Title>{item.nome} - {item.preco}</Card.Title>
                    <Card.Text>
                    {item.descricao}
                    </Card.Text>
                    
                  </Card.Body>
                </Card>
                </CardGroup>
            ))}
            </Row>
        <div className="d-grid mt-3 mb-5 gap-2">
          <Button href='/alunos/form' variant="primary" size="lg">
            Matricule-se Já
          </Button>
        </div>
      </Navegacao>
    </>
  )
}

export default index