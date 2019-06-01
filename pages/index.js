/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Form, FormGroup, Input } from 'reactstrap';

const fn = ({ photos }) => {
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

fn.defaultProps = {
  photos: require('../src/fixtures/photos.json'),
};

export default fn;
