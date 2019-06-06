/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Button } from 'reactstrap';
import Select from 'react-select';
import throttle from 'lodash/throttle';
import * as mobilenet from '@tensorflow-models/mobilenet';

import getPhotos from '../src/instagram/apis/getPhotos';
import getUsers from '../src/instagram/apis/getUsers';
import CarouselView from '../src/components/CarouselView';
import UserItem from '../src/components/UserItem';
import Section from '../src/components/Section';
import './index.css';
import getFollowings from '../src/instagram/apis/getFollowings';
import AuthContext from '../src/instagram/auth/context';

const Comp = () => {
  const [photoGroups, setPhotoGroups] = useState(null);
  const [options, setOptions] = useState(null);
  const [query, setQuery] = useState(null);
  const [users, setUsers] = useState(null);
  const { authenticated, userId } = useContext(AuthContext);
  const onInputChange = createOnInputChange({ setOptions });
  const onOptionChange = createOnOptionChange({ setQuery, setPhotoGroups });
  useEffect(() => {
    const defaultOptions = require('../src/fixtures/users.json');
    if (!options && !photoGroups) {
      setOptions(defaultOptions);
      onOptionChange(defaultOptions[0]);
    }
    if (!global.modelLoading) global.modelLoading = mobilenet.load();
    if (!users && userId) {
      getFollowings({ id: userId }).then(setUsers);
    }
  });
  return (
    <>
      <Section>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <div className="search-form">
              {options && (
                <Form>
                  <FormGroup>
                    <Label>Search by Instagram username</Label>
                    <Select
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
      </Section>
      <Section>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <div>
              {photoGroups &&
                photoGroups.map((photoGroup) => {
                  const { user, photos } = photoGroup;
                  return (
                    <div key={user.value} className="photo-group">
                      <a href={`https://instagram.com/${user.username}`} target="_blank">
                        <UserItem {...user} />
                      </a>
                      <div className="content">
                        <CarouselView photos={photos} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </Col>
        </Row>
      </Section>
      {!authenticated && (
        <Section>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Button color="primary" block href="/login">
                Login with Instagram
              </Button>
            </Col>
          </Row>
        </Section>
      )}
      {authenticated && users && (
        <Section>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              {users.map((user) => {
                return <UserItem key={user.id} {...user} />;
              })}
            </Col>
          </Row>
        </Section>
      )}
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

function createOnOptionChange({ setQuery, setPhotoGroups }) {
  return (option) => {
    const { value: id } = option;
    setQuery(option);
    // prettier-ignore
    getPhotos({ id })
      .then((photos) => {
        const photoGroups = [{ user: option, photos }];
        setPhotoGroups(photoGroups);
      });
  };
}

export default Comp;
