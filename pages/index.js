/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import Select from 'react-select';
import throttle from 'lodash/throttle';

import getPhotos from '../src/functions/instagram/getPhotos';
import getUsers from '../src/functions/instagram/getUsers';

const Comp = () => {
  const [query, setQuery] = useState();
  const [photos, setPhotos] = useState([]);
  const [options, setOptions] = useState([]);
  const onInputChange = createOnInputChange({ setOptions });
  const onOptionChange = createOnOptionChange({ setQuery, setPhotos });
  return (
    <>
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">Instagram</NavbarBrand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <div className="search-form">
              <Form>
                <FormGroup>
                  <Select
                    options={options}
                    value={query}
                    onChange={onOptionChange}
                    onInputChange={onInputChange}
                  />
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <div className="photos-container">
              {photos.map(({ src }) => (
                <div
                  key={src}
                  className="photo"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
          </Col>
        </Row>
        <style jsx>
          {`
            .container {
              padding: 0;
            }
            .photos-container {
              margin: 0 auto;
            }
            @media (min-width: 768px) {
              .photos-container {
                margin: 50px 0;
              }
            }
            .photo {
              display: inline-block;
              width: 33.33%;
              padding-bottom: 33.33%;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: 50%;
              margin-bottom: -6px;
            }
            .search-form {
              margin-top: 1rem;
            }
            @media (min-width: 768px) {
              .search-form {
                margin-top: 50px;
              }
            }
          `}
        </style>
      </Container>
    </>
  );
};

function createOnInputChange({ setOptions }) {
  let loading = Promise.resolve();
  const fn = (query) => {
    loading = loading.then(() => getUsers({ query })).then(setOptions);
  };
  return throttle(fn, 2000);
}

function createOnOptionChange({ setQuery, setPhotos }) {
  return (option) => {
    const { value: id } = option;
    setQuery(option);
    getPhotos({ id }).then(setPhotos);
  };
}

export default Comp;
