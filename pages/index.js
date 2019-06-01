/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Form, FormGroup, Input } from 'reactstrap';

import getPhotos from '../src/functions/instagram/getPhotos';

const fn = () => {
  const [query, setQuery] = useState('110379');
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    getPhotos({ id: query }).then(setPhotos);
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
              <Form>
                <FormGroup>
                  <Input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search with username"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
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

export default fn;
