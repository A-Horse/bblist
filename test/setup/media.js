Object.defineProperty(window, 'matchMedia', {
  value: query => {
    const queryMap = {
      '(min-width: 600px)': () => true,
      '(max-width: 600px)': () => true
    };

    const queryValue = queryMap[query];
    const matches = queryValue ? queryValue() : false;

    return {
      matches,
      addListener: () => {},
      removeListener: () => {}
    };
  }
});
