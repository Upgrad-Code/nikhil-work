import React, { useReducer, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { JSONPLACEHOLDER_API_URL } from '../../helpers/config';
import { getJson } from '../../helpers/helperFns';
import { ACTION_TYPES } from '../../helpers/actions';
import { iState, reducer } from '../../reducers/jsonPlaceholderReducer';
import './HomePage.scss';

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, iState);
  console.log(state);

  const { isLoading, jsonPlaceholderData, isError, jsonPlaceholderPram } =
    state;

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    (async () => {
      try {
        const data = await getJson(
          `${JSONPLACEHOLDER_API_URL}/${jsonPlaceholderPram}`
        );
        dispatch({
          type: ACTION_TYPES.FETCH_SUCCESS,
          payload: [...data],
        });
      } catch (err) {
        dispatch({
          type: ACTION_TYPES.FETCH_ERROR,
          payload: err,
        });
      }
    })();

    console.log('useEffect runs...');

    return () => {
      console.log('Clean Up...');
    };
  }, []);

  return (
    <section className="home-page">
      <Container>
        <Row>
          <Col md={12}>Homepage...</Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
