import React from 'react';
import App, { Container } from 'next/app';

import Page from '../src/components/Page';
import AuthProvider from '../src/instagram/auth/provider';

class Comp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <AuthProvider>
          <Page>
            <Component {...this.props} />
          </Page>
        </AuthProvider>
      </Container>
    );
  }
}

export default Comp;
