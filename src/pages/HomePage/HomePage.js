import React, { useReducer, useEffect, useRef } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { JSONPLACEHOLDER_API_URL } from '../../helpers/config';
import { getJson } from '../../helpers/helperFns';
import { ACTION_TYPES } from '../../helpers/actions';
import { iState, reducer } from '../../reducers/jsonPlaceholderReducer';
import './HomePage.scss';

const HomePage = () => {
  console.log('component render');
  const [state, dispatch] = useReducer(reducer, iState);

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
  }, [jsonPlaceholderPram]);

  const placeholderHandler = (e) => {
    return dispatch({
      type: ACTION_TYPES.UPDATE_JSONPLACEHOLDER_PRAM,
      payload: e.target.value,
    });
  };

  return (
    <section className="home-page">
      <Container>
        <Row>
          <Col md={12} className="mb-3">
            Homepage...
          </Col>
          <Col md={12} className="mb-3">
            <Button
              variant="outline-primary"
              onClick={placeholderHandler}
              value="posts"
              className={jsonPlaceholderPram === 'posts' ? 'active' : ''}
            >
              posts
            </Button>{' '}
            <Button
              variant="outline-primary"
              onClick={placeholderHandler}
              value="comments"
              className={jsonPlaceholderPram === 'comments' ? 'active' : ''}
            >
              comments
            </Button>{' '}
            <Button
              variant="outline-primary"
              onClick={placeholderHandler}
              value="albums"
              className={jsonPlaceholderPram === 'albums' ? 'active' : ''}
            >
              albums
            </Button>{' '}
            <Button
              variant="outline-primary"
              onClick={placeholderHandler}
              value="photos"
              className={jsonPlaceholderPram === 'photos' ? 'active' : ''}
            >
              photos
            </Button>{' '}
            <Button
              variant="outline-primary"
              onClick={placeholderHandler}
              value="todos"
              className={jsonPlaceholderPram === 'todos' ? 'active' : ''}
            >
              todos
            </Button>{' '}
            <Button
              variant="outline-primary"
              onClick={placeholderHandler}
              value="users"
              className={jsonPlaceholderPram === 'users' ? 'active' : ''}
            >
              users
            </Button>{' '}
          </Col>
          <Col md={12} className="mb-3">
            <div className="content">{JSON.stringify(jsonPlaceholderData)}</div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
