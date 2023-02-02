import React, { useContext } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Row, Col } from 'react-bootstrap';
import { ProductsContext } from '../../contexts/productsContext';
import { ACTION_TYPES } from '../../helpers/actions';

export const RatingFilter = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const { ratingPram } = state;
  const ratingChanged = (value) => {
    console.log(value);
    dispatch({
      type: ACTION_TYPES.UPDATE_RATING_PRAM,
      payload: value,
    });
  };

  return (
    <Row>
      <Col>Select rating to filter...</Col>
      <Col>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={40}
          isHalf={true}
          value={ratingPram}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
      </Col>
    </Row>
  );
};
