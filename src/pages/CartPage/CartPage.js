import React, { useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { ProductsContext } from '../../contexts/productsContext';

const CartPage = () => {
  const { state, dispatch } = useContext(ProductsContext);
  return (
    <section className="cart__page">
      <Container>
        <Row>
          <Col md={12}>
            <h5>Cart Page...</h5>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartPage;
