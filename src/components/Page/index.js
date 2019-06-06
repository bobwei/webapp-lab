/* eslint-disable no-alert */
import React, { useState, useContext } from 'react';
import { Container } from 'reactstrap';
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, NavLink, Collapse } from 'reactstrap';

import AuthContext from '../../instagram/auth/context';
import logout from '../../instagram/apis/logout';

const Comp = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authenticated, setAuth } = useContext(AuthContext);
  const onLogout = createOnLogoutClick({ setAuth, setIsLoading });
  return (
    <>
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">Instagram</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen((state) => !state)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {authenticated && (
                <NavItem onClick={onLogout}>
                  <NavLink>{isLoading ? 'Loading...' : 'Log Out'}</NavLink>
                </NavItem>
              )}
              {!authenticated && (
                <NavItem>
                  <NavLink href="/login">Log In</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

function createOnLogoutClick({ setAuth, setIsLoading }) {
  return () => {
    if (window.confirm('Are you sure you want to log out ?')) {
      setIsLoading(true);
      logout()
        .then(() => {
          setAuth({ authenticated: false });
          setIsLoading(false);
        })
        .catch((error) => {
          alert(error);
          setIsLoading(false);
        });
    }
  };
}

export default Comp;
