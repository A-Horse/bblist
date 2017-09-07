var localStorageMock = (function() {
  var store = {
    AUTH_DATA:
      '{"jwts-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoiYWJ5Y2hhbkBvdXRsb29rLmNvbSIsInN0YXR1cyI6bnVsbCwidHlwZSI6bnVsbCwiZGVzYyI6bnVsbCwiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbH0sImlhdCI6MTUwNDUzOTc0NX0.4e4suPkq_qtLywoRhvw43tHbP48RigtB1HrYN7D4HiY","CACHED_USEREMAIL":"abychan@outlook.com","CACHED_USERID":34,"CACHED_USERNAME":null}'
  };
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
