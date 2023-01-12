import React from 'react';
import { Col } from 'react-bootstrap';

export const ProductPagination = ({ data }) => {
  const { prodsTotal, prodsLimit, selectPageHandler } = data;

  const createPagesArray = () => {
    const arrLen = Math.floor(prodsTotal / prodsLimit);
    const arr = [];
    for (let i = 1; i <= arrLen; i++) {
      arr.push(i);
    }
    return arr;
  };

  const pages = createPagesArray();

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
          {pages &&
            Array.isArray(pages) &&
            pages.length > 0 &&
            pages.map((page) => {
              return (
                <li className="page-item" key={page}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => selectPageHandler(page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
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
