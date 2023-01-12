import React from 'react';
import { Col, Pagination } from 'react-bootstrap';

export const ProductPagination = ({ data }) => {
  const { prodsTotal, prodsLimit } = data;
  const arrLen = Math.floor(prodsTotal / prodsLimit);
  console.log(arrLen);
  return (
    <Col md={12}>
      <nav>
        <ul className="pagination">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Col>
  );
};