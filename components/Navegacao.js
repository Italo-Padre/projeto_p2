import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navegacao = (props) => {
  return (
    <>
      <Navbar className='mb-5' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/esportes">ESPORTES</Nav.Link>
            <Nav.Link href="/esportes/form">form esportes</Nav.Link>
            <Nav.Link href="/professores">Professores</Nav.Link>
            <Nav.Link href="/professores/form">form professores</Nav.Link>
            <Nav.Link href="/alunos">Alunos</Nav.Link>
            <Nav.Link href="/alunos/form">form alunos</Nav.Link>
            <Nav.Link href="/materiais">Materiais</Nav.Link>
            <Nav.Link href="/materiais/form">form Materiais</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {props.children}
      </Container>
    </>
  )
}

export default Navegacao