import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import ProductsPage from './pages/ProductsPage/ProductsPage';
import CartPage from './pages/CartPage/CartPage';
// import HomePage from './pages/HomePage/HomePage';
// import JsonPlaceholderPage from './pages/JsonPlaceholderPage/JsonPlaceholderPage';
import './style.css';

export default function App() {
  return (
    <section className="nik_app">
      {/* <HomePage /> */}
      {/* <JsonPlaceholderPage /> */}
      <Container fluid>
        <Row>
          <Col md={7}>
            <Row>
              <ProductsPage />
            </Row>
          </Col>
          <Col md={5}>
            <Row>
              <CartPage />
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
