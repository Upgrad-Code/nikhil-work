import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { ACTION_TYPES } from '../../helpers/actions';
import { ProductsContext } from '../../contexts/productsContext';
import './Product.scss';

export const Product = ({ data }) => {
  const { state, dispatch } = useContext(ProductsContext);
  // console.log(state);
  const { products, cart } = state;

  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  };

  const laodImg = (entries, observer) => {
    entries.forEach((entry) => {
      // if element is not intesecting to the view port return from here...
      if (!entry.isIntersecting) return;

      // if the element is intesecting replace src attribute with orignal image...
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('loading');
      });

      // if image is loaded no need to observe it again..
      observer.unobserve(entry.target);
    });
  };

  useEffect(() => {
    const imgObserver = new IntersectionObserver(laodImg, options);
    const imgs = document.querySelectorAll('img[data-src]');
    imgs.forEach((img) => imgObserver.observe(img));

    return () => {
      imgs.forEach((img) => imgObserver.unobserve(img));
    };
  }, []);

  const addToCartHandler = (id) => {
    const selectedProduct = products.find((p) => p.id === id);

    const product = {
      id: selectedProduct.id,
      title: selectedProduct.title,
      thumbnail: selectedProduct.thumbnail,
      price: selectedProduct.price,
      rating: selectedProduct.rating,
      stock: selectedProduct.stock,
      quantity: 1,
    };

    dispatch({
      type: ACTION_TYPES.ADD_TO_CART,
      payload: product,
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_FROM_CART,
      payload: id,
    });
  };

  return (
    <>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        data.map((p) => {
          return (
            <Col lg={3} md={3} key={p.id} className="mb-4 product">
              <Card>
                <Card.Img
                  variant="top"
                  src="https://raw.githubusercontent.com/Upgrad-Code/nikhil-work/f81810ec9f1f0b4ad88ec0ef077741242c3cceb0/public/img/dummy-img.jpg"
                  data-src={p.thumbnail}
                  className="loading"
                />
                <Card.Body>
                  <Card.Title>
                    {p.title} |{' '}
                    <span className="product__price">${p.price}</span>
                  </Card.Title>
                  {/* <Card.Text>${p.price}</Card.Text> */}

                  {cart && cart.find((cp) => cp.id === p.id) ? (
                    <Button
                      variant="danger"
                      onClick={() => {
                        removeFromCart(p.id);
                      }}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => {
                        addToCartHandler(p.id);
                      }}
                    >
                      Add
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </>
  );
};
