/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import Select from 'react-select';
import throttle from 'lodash/throttle';

import getPhotos from '../src/functions/instagram/getPhotos';
import getUsers from '../src/functions/instagram/getUsers';
import CarouselView from '../src/components/CarouselView';
import './index.css';

const Comp = () => {
  const [photos, setPhotos] = useState(null);
  const [options, setOptions] = useState(null);
  const [query, setQuery] = useState(null);
  const onInputChange = createOnInputChange({ setOptions });
  const onOptionChange = createOnOptionChange({ setQuery, setPhotos });
  useEffect(() => {
    const defaultOptions = require('../src/fixtures/users.json');
    if (!options && !photos) {
      setOptions(defaultOptions);
      onOptionChange(defaultOptions[0]);
    }
  });
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
              {options && (
                <Form>
                  <FormGroup>
                    <Select
                      autoFocus
                      options={options}
                      value={query}
                      onChange={onOptionChange}
                      onInputChange={onInputChange}
                    />
                  </FormGroup>
                </Form>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            {photos && <CarouselView photos={photos} />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

function createOnInputChange({ setOptions }) {
  let loading = Promise.resolve();
  const fn = (query) => {
    if (query) {
      loading = loading.then(() => getUsers({ query })).then(setOptions);
    }
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
