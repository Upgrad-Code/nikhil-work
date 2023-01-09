import React, { useReducer, useEffect } from 'react';
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import { JSONPLACEHOLDER_API_URL } from '../../helpers/config';
import { getJson } from '../../helpers/helperFns';
import { ACTION_TYPES } from '../../helpers/actions';
import { iState, reducer } from '../../reducers/jsonPlaceholderReducer';
import './JsonPlaceholderPage.scss';

const HomePage = () => {
  console.count('component render');
  const [state, dispatch] = useReducer(reducer, iState);

  const { isLoading, jsonPlaceholderData, isError, jsonPlaceholderPram } =
    state;

  useEffect(() => {
    let subscribed = true;

    dispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    (async () => {
      try {
        const data = await getJson(
          `${JSONPLACEHOLDER_API_URL}/${jsonPlaceholderPram}`
        );

        if (subscribed) {
          dispatch({
            type: ACTION_TYPES.FETCH_SUCCESS,
            payload: [...data],
          });
        }
      } catch (err) {
        if (subscribed) {
          dispatch({
            type: ACTION_TYPES.FETCH_ERROR,
            payload: err,
          });
        }
      }
    })();

    console.count('useEffect runs...');

    return () => {
      console.count('Clean Up...');
      subscribed = false;
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
            <div className="content">
              {isLoading ? (
                <Spinner animation="border" />
              ) : isError ? (
                <p className="error">{isError}</p>
              ) : (
                <p>{JSON.stringify(jsonPlaceholderData)}</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
