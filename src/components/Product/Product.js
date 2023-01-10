import React from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import './Product.scss';

export const Product = ({ data }) => {
  console.log(data);
  return (
    <>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        data.map((p) => {
          return (
            <Col lg={3} md={4} key={p.id} className="mb-4 product">
              <Card>
                <Card.Img variant="top" src={p.thumbnail} />
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                  <Button variant="primary">Add to cart</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </>
  );
};
