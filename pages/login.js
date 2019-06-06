import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Router from 'next/router';
import * as R from 'ramda';

import AuthContext from '../src/instagram/auth/context';
import login from '../src/instagram/apis/login';

const Comp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const onSubmit = createOnSubmit({ data: { username, password }, setAuth });
  return (
    <>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <div className="form-wrapper">
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  placeholder="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button color="primary">Submit</Button>
            </Form>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .form-wrapper {
            margin-top: 50px;
          }
        `}
      </style>
    </>
  );
};

function createOnSubmit({ data, setAuth }) {
  return (e) => {
    e.preventDefault();
    login(data)
      .then(R.tap(setAuth))
      .then(() => Router.push('/'));
  };
}

export default Comp;
