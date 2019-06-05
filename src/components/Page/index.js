/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, NavLink, Collapse } from 'reactstrap';

import isAuthenticated from '../../instagram/functions/isAuthenticated';
import logout from '../../instagram/apis/logout';

const Comp = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  });
  return (
    <>
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">Instagram</NavbarBrand>

          <NavbarToggler onClick={() => setIsOpen((state) => !state)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isLoggedIn && (
                <NavItem onClick={createOnLogoutClick()}>
                  <NavLink>Log Out</NavLink>
                </NavItem>
              )}
              {!isLoggedIn && (
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

function createOnLogoutClick() {
  return () => {
    if (window.confirm('Are you sure you want to log out ?')) {
      logout().then(() => window.location.reload());
    }
  };
}

export default Comp;
