import React from 'react';
import App, { Container } from 'next/app';

import Page from '../src/components/Page';

class Comp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Page>
          <Component {...this.props} />
        </Page>
      </Container>
    );
  }
}

export default Comp;
