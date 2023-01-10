import React, { useEffect, useReducer, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { DUMMY_PRODUCTS_API_URL } from '../../helpers/config';
import { getJson } from '../../helpers/helperFns';
import { iState, reducer } from '../../reducers/productsPageReducer';
import './ProductsPage.scss';

const ProductsPage = () => {
  const [state, dispatch] = useReducer(reducer, iState);
  console.log(state, dispatch);

  useEffect(() => {
    (async () => {
      const data = await getJson(DUMMY_PRODUCTS_API_URL);
    })();
  });
  return (
    <Container>
      <Row>
        <Col md={12}>
          <p>Product Page...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
