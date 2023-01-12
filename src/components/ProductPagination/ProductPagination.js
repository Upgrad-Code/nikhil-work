import React from 'react';
import { Col } from 'react-bootstrap';
import { ACTION_TYPES } from '../../helpers/actions';

export const ProductPagination = ({ data }) => {
  const {
    prodsTotal,
    prodsLimit,
    pageNum,
    selectPageHandler,
    increasePageHandler,
  } = data;

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
                    href="#"
                    className={
                      page === pageNum ? 'page-link active' : 'page-link'
                    }
                    // onClick={(ev) => selectPageHandler(ev, page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              // onClick={(ev) => increasePageHandler(ev, pageNum)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Col>
  );
};
