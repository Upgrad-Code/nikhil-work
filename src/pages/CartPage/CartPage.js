import React, { useContext, useState, useEffect } from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { ProductsContext } from '../../contexts/productsContext';
import { ACTION_TYPES } from '../../helpers/actions';
import './CartPage.scss';

const CartPage = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const { cart } = state;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calcSum = cart.reduce((acc, cp) => {
      return acc + cp.price * cp.quantity;
    }, 0);

    setTotal(calcSum);
  }, [cart]);

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
                    <Col md={12} key={cp.id} className="cart__product mb-3">
                      <Row>
                        <Col md={2}>
                          <Card>
                            <Card.Img
                              variant="top"
                              src={cp.thumbnail}
                              // src="https://raw.githubusercontent.com/Upgrad-Code/nikhil-work/f81810ec9f1f0b4ad88ec0ef077741242c3cceb0/public/img/dummy-img.jpg"
                              data-src={cp.thumbnail}
                              className="loading cart__product-img"
                            />
                          </Card>
                        </Col>
                        <Col md={3}>
                          <Card.Title>
                            <span className="cart__product-title">
                              {cp.title}
                            </span>
                          </Card.Title>
                        </Col>
                        <Col md={4}>
                          <Button
                            onClick={() => {
                              dispatch({
                                type: ACTION_TYPES.UPDATE_PRODUCT_QTY,
                                payload: {
                                  quantity: cp.quantity - 1,
                                  id: cp.id,
                                },
                              });
                            }}
                          >
                            -
                          </Button>
                          <span className="cart__product-qty">
                            {cp.quantity}
                          </span>
                          <Button
                            onClick={() => {
                              dispatch({
                                type: ACTION_TYPES.UPDATE_PRODUCT_QTY,
                                payload: {
                                  quantity: cp.quantity + 1,
                                  id: cp.id,
                                },
                              });
                            }}
                          >
                            +
                          </Button>
                        </Col>
                        <Col md={3}>
                          <span className="cart__product-price">
                            ${cp.price * cp.quantity}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              <Col md={12}>
                <Row>
                  <Col md={9}>
                    <h5>Cart Total</h5>
                  </Col>
                  <Col md={3}>${total}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartPage;
