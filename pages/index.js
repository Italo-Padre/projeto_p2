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
          {esportes.map(item => (
        <Row>
       
          <CardGroup>
         <Card  className="bg-dark text-white text-center">
         <Card.Img style={{ width: '1100px', height:'500px' }}   src={item.imagem} alt="Card image"  />
         <Card.ImgOverlay>
           <Card.Title>{item.nome}</Card.Title>
           <Card.Text>
             {item.descricao}
           </Card.Text>
           <Card.Text>{item.preco}</Card.Text>
         </Card.ImgOverlay>
       </Card>
          </CardGroup>
     
        </Row>
          ))}
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