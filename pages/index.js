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
import SwiperView from '../src/components/SwiperView';
import UserItem from '../src/components/UserItem';
import Section from '../src/components/Section';
import Photo from '../src/components/Photo';
import SpotsView from '../src/components/SpotsView';
import Overlay from '../src/components/Overlay';
import './index.css';
import getFollowings from '../src/instagram/apis/getFollowings';
import AuthContext from '../src/instagram/auth/context';

const Comp = () => {
  const [photoGroups, setPhotoGroups] = useState(null);
  const [options, setOptions] = useState(null);
  const [query, setQuery] = useState(null);
  const [users, setUsers] = useState(null);
  const [selectedPhotoGroup, setSelectedPhotoGroup] = useState(null);
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
      <Section title="Recommended">
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
                        <SwiperView>
                          {() =>
                            photos.map((photo) => {
                              return <Photo key={photo.id} photo={photo} />;
                            })
                          }
                        </SwiperView>
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
        <Section title="Followings">
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              {users.map((user) => {
                return (
                  <UserItem
                    key={user.id}
                    {...user}
                    withCheckButton
                    onCheckClick={createOnCheckClick({ user, setSelectedPhotoGroup })}
                  />
                );
              })}
            </Col>
          </Row>
        </Section>
      )}
      {selectedPhotoGroup && (
        <Overlay onBackdropClick={createOnBackdropClick({ setSelectedPhotoGroup })}>
          <div className="spots-view-wrapper">
            <SpotsView photos={selectedPhotoGroup.photos} />
          </div>
        </Overlay>
      )}
      <style jsx>
        {`
          .spots-view-wrapper {
            height: 100vw;
            margin-top: 100px;
            position: relative;
            display: flex;
            flux-direction: column;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};

function createOnBackdropClick({ setSelectedPhotoGroup }) {
  return () => {
    setSelectedPhotoGroup(null);
  };
}

function createOnCheckClick({ user, setSelectedPhotoGroup }) {
  return () => {
    setSelectedPhotoGroup({ user });
    const { id } = user;
    // prettier-ignore
    getPhotos({ id })
      .then((photos) => {
        setSelectedPhotoGroup({ user, photos });
      });
  };
}

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
