import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { ACTION_TYPES } from '../../helpers/actions';
import { ProductsContext } from '../../contexts/productsContext';
import './Product.scss';

export const Product = ({ data }) => {
  const { state, dispatch } = useContext(ProductsContext);
  console.log(state);
  const { products } = state;

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
  });

  const addToCartHandler = (id) => {
    const product = products.find((p) => p.id === id);

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
            <Col lg={4} md={4} key={p.id} className="mb-4 product">
              <Card>
                <Card.Img
                  variant="top"
                  src="https://raw.githubusercontent.com/Upgrad-Code/nikhil-work/f81810ec9f1f0b4ad88ec0ef077741242c3cceb0/public/img/dummy-img.jpg"
                  data-src={p.thumbnail}
                  className="loading"
                />
                <Card.Body>
                  {/* <Card.Title>{p.id}</Card.Title> */}
                  <Card.Title>{p.title}</Card.Title>
                  {/* <Card.Text>{p.description}</Card.Text> */}
                  <Button
                    variant="primary"
                    onClick={() => {
                      addToCartHandler(p.id);
                    }}
                  >
                    Add to cart
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      removeFromCart(p.id);
                    }}
                  >
                    Remove From Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </>
  );
};
