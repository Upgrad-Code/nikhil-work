import React, { useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { DUMMY_PRODUCTS_API_URL } from '../../helpers/config';
import { ACTION_TYPES } from '../../helpers/actions';
import { getJson } from '../../helpers/helperFns';
// import { iState, reducer } from '../../reducers/productsPageReducer';
import { ProductsContext } from '../../contexts/productsContext';
import { Product } from '../../components/Product/Product';
import { ProductPagination } from '../../components/ProductPagination/ProductPagination';
import './ProductsPage.scss';

const ProductsPage = () => {
  const { state, dispatch } = useContext(ProductsContext); // Now reducer make use of values from context...

  const { loading, products, error, pageNum, prodsLimit, prodsTotal } = state;

  console.log(state);

  useEffect(() => {
    let subscribed = true;

    dispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    (async () => {
      try {
        const data = await getJson(
          `${DUMMY_PRODUCTS_API_URL}/?limit=${prodsLimit}&skip=${
            prodsLimit * pageNum - prodsLimit
          }`
        );

        console.log(data);
        if (subscribed) {
          dispatch({
            type: ACTION_TYPES.FETCH_SUCCESS,
            payload: { products: [...data.products], total: data.total },
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
  }, [pageNum]);

  // const selectPageHandler = (ev, pageNum) => {
  //   ev.preventDefault();
  //   dispatch({
  //     type: ACTION_TYPES.UPDATE_PAGE_NUMBER,
  //     payload: pageNum,
  //   });
  // };

  // const increasePageHandler = (ev, pageNum) => {
  //   ev.preventDefault();
  //   dispatch({
  //     type: ACTION_TYPES.INCREASE_PAGE_NUMBER,
  //     payload: pageNum + 1,
  //   });
  // };

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
          <ProductPagination />
        </Row>
      </Container>
    </section>
  );
};

export default ProductsPage;
