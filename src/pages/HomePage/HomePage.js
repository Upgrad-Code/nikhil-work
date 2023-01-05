import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import './HomePage.scss';

const HomePage = () => {
  return (
    <section className="home-page">
      <Container>
        <Row>
          <Col md={12}>Homepage...</Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
