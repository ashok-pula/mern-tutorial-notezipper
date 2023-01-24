import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{width:"100%",position:"relative",bottom:"0",display:"flex",justifyContent:"center"}}>
      <Container>
        <Row>
          <Col className='text-center'>
            Copyrigth &copy; Notezipper
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer