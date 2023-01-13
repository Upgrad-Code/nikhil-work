import React, { useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { DUMMY_PRODUCTS_API_URL } from '../../helpers/config';
import { ACTION_TYPES } from '../../helpers/actions';
import { getJson } from '../../helpers/helperFns';
import { ProductsContext } from '../../contexts/productsContext';
import { Product } from '../../components/Product/Product';
import { ProductPagination } from '../../components/ProductPagination/ProductPagination';
import { Loader } from '../../components/Loader/Loader';
import './ProductsPage.scss';

const ProductsPage = () => {
  const { state, dispatch } = useContext(ProductsContext);

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
            pageNum * prodsLimit - prodsLimit
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

  return (
    <section className="product__page">
      <Container>
        <Row>
          <Col md={12}>
            <p>Product Page...</p>
          </Col>
        </Row>
        <Row>
          <Col md={8} className="position-relative">
            {loading ? (
              <Loader />
            ) : error ? (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              <Row>
                <Product data={products} />
                <ProductPagination />
              </Row>
            )}
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductsPage;
