import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import './Product.scss';

export const Product = ({ data }) => {
  const [loaded, setLoaded] = useState(false);

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

  return (
    <>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        data.map((p) => {
          return (
            <Col lg={3} md={4} key={p.id} className="mb-4 product">
              <Card>
                <Card.Img
                  variant="top"
                  src="https://raw.githubusercontent.com/Upgrad-Code/nikhil-work/f81810ec9f1f0b4ad88ec0ef077741242c3cceb0/public/img/dummy-img.jpg"
                  data-src={p.thumbnail}
                  className="loading"
                />
                {/* <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                  <Button variant="primary">Add to cart</Button>
                </Card.Body> */}
              </Card>
            </Col>
          );
        })}
    </>
  );
};
