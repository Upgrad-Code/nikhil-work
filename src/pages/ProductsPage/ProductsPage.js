import React, { useEffect, useReducer, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { DUMMY_PRODUCTS_API_URL } from '../../helpers/config';
import { ACTION_TYPES } from '../../helpers/actions';
import { getJson } from '../../helpers/helperFns';
// import { iState, reducer } from '../../reducers/productsPageReducer';
import { ProductsContext } from '../../contexts/productsContext';
import { Product } from '../../components/Product/Product';
import './ProductsPage.scss';

const ProductsPage = () => {
  const { iState, reducer } = useContext(ProductsContext); // Now reducer make use of values from context...
  const [state, dispatch] = useReducer(reducer, iState);

  const { loading, products, error } = state;

  useEffect(() => {
    let subscribed = true;

    dispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    (async () => {
      try {
        const data = await getJson(DUMMY_PRODUCTS_API_URL);
        if (subscribed) {
          dispatch({
            type: ACTION_TYPES.FETCH_SUCCESS,
            payload: [...data.products],
          });
        }
      } catch (err) {
        if (subscribed) {
          dispatch({
            type: ACTION_TYPES.FETCH_ERROR,
            payload: err,
          });
        }
      }
    })();

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <section className="product__page">
      <Container>
        <Row>
          <Col md={12}>
            <p>Product Page...</p>
          </Col>
        </Row>
        <Row>
          <Product data={products} />
        </Row>
      </Container>
    </section>
  );
};

export default ProductsPage;
