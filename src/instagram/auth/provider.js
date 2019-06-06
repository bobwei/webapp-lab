import React, { useState, useEffect } from 'react';

import context from './context';

const { Provider } = context;
const storageKey = 'auth';

const Comp = ({ children }) => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    if (!auth) {
      // init auth state
      const data = localStorage.getItem(storageKey) || JSON.stringify({ authenticated: false });
      const state = JSON.parse(data);
      setAuth(state);
    }
  });
  return (
    <Provider
      value={{
        ...auth,
        setAuth: (state) => {
          localStorage.setItem(storageKey, JSON.stringify(state));
          setAuth(state);
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default Comp;
