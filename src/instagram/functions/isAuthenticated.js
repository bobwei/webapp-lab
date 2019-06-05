const fn = () => {
  if (process.browser) {
    return document.cookie.indexOf('sessionid') > -1;
  }
  return false;
};

export default fn;
