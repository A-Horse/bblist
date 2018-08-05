var localStorageMock = (function() {
  var store = {
    CACHED_USERID: 34,
    'jwt-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IumZs-aUvueCujJzZHNkITIyMjIyMjIyMjIyIiwiZW1haWwiOiJjaGVuZmFuZ3dlaUBvdXRsb29rLmNvbSIsInN0YXR1cyI6bnVsbCwidHlwZSI6bnVsbCwiZGVzYyI6bnVsbCwiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbH0sImlhdCI6MTUwNjAwOTIwNX0.aWTfMa9hnf51hBq9jzv7niE3N-qxsGlOPaMdrbKOcYI'
  };
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      if (typeof value === 'string') {
        store[key] = value;
      } else {
        store[key] = value.toString();
      }
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
