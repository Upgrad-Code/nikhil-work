import React, { useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { DUMMY_PRODUCTS_API_URL } from '../../helpers/config';
import { ACTION_TYPES } from '../../helpers/actions';
import { getJson } from '../../helpers/helperFns';
import { ProductsContext } from '../../contexts/productsContext';
import { Product } from '../../components/Product/Product';
import { ProductPagination } from '../../components/ProductPagination/ProductPagination';
import { Loader } from '../../components/Loader/Loader';
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import { RatingFilter } from '../../components/RatingFilter/RatingFilter';
import './ProductsPage.scss';

const ProductsPage = () => {
  const { state, dispatch } = useContext(ProductsContext);

  const {
    loading,
    products,
    error,
    pageNum,
    prodsLimit,
    prodsTotal,
    searchPram,
    ratingPram,
  } = state;

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

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchPram.toLowerCase()) &&
      p.rating <= ratingPram
  );

  return (
    <section className="product__page">
      <Container>
        <Row>
          <Col md={12}>
            <h5>Product Page...</h5>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="position-relative">
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorAlert data={error} />
            ) : (
              <Row>
                <Col md={6}>
                  <RatingFilter />
                </Col>
                <Col md={6}>
                  <SearchBox label="Start typing to filter..." />
                </Col>

                <Product data={filteredProducts} />
                <ProductPagination />
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductsPage;
