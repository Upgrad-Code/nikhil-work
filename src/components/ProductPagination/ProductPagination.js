import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { ACTION_TYPES } from '../../helpers/actions';
import { ProductsContext } from '../../contexts/productsContext';

export const ProductPagination = () => {
  const { state, dispatch } = useContext(ProductsContext);
  console.log(state);

  const { prodsTotal, prodsLimit, pageNum } = state;
  // console.log(prodsTotal, prodsLimit, pageNum);

  const createPagesArray = () => {
    const arrLen = Math.ceil(prodsTotal / prodsLimit);
    const arr = [];
    for (let i = 1; i <= arrLen; i++) {
      arr.push(i);
    }
    return arr;
  };

  const pages = createPagesArray();
  console.log(pages);

  return (
    <Col md={12}>
      <nav className="product__page_pagination">
        <ul className="pagination">
          <li className={pageNum === 1 ? 'page-item disabled' : 'page-item'}>
            <a
              className="page-link"
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                dispatch({
                  type: ACTION_TYPES.UPDATE_PAGE_NUMBER,
                  payload: pageNum - 1,
                });
              }}
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
                    onClick={(ev) => {
                      ev.preventDefault();
                      dispatch({
                        type: ACTION_TYPES.UPDATE_PAGE_NUMBER,
                        payload: page,
                      });
                    }}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          <li
            className={
              pageNum >= pages.length ? 'page-item disabled' : 'page-item'
            }
          >
            <a
              className="page-link"
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                dispatch({
                  type: ACTION_TYPES.UPDATE_PAGE_NUMBER,
                  payload: pageNum + 1,
                });
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </Col>
  );
};
