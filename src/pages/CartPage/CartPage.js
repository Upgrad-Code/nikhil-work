import React, { useContext } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { ProductsContext } from '../../contexts/productsContext';

const CartPage = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const { cart } = state;
  return (
    <section className="cart__page">
      <Container>
        <Row>
          <Col md={12}>
            <h5>Cart Page...</h5>
          </Col>
          <Col md={12}>
            <Row>
              {cart &&
                cart.map((cp) => {
                  return (
                    <Col md={12}>
                      <Row>
                        <Col>
                          <Card>
                            <Card.Img
                              variant="top"
                              src={cp.thumbnail}
                              // src="https://raw.githubusercontent.com/Upgrad-Code/nikhil-work/f81810ec9f1f0b4ad88ec0ef077741242c3cceb0/public/img/dummy-img.jpg"
                              data-src={cp.thumbnail}
                              className="loading"
                            />
                          </Card>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartPage;
