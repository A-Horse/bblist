import http from './http';
import nock from 'nock';

test('http get', () => {
  nock('http://ocotpus.xyz')
    .get('/api/test')
    .reply(200, { foo: 'bar' });
  return expect(http.get('http://ocotpus.xyz/api/test')).resolves.toEqual({
    foo: 'bar'
  });
});

test('http get with jwt', () => {
  nock('http://ocotpus.xyz', {
    reqheaders: {
      'jwt-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IumZs-aUvueCujJzZHNkITIyMjIyMjIyMjIyIiwiZW1haWwiOiJjaGVuZmFuZ3dlaUBvdXRsb29rLmNvbSIsInN0YXR1cyI6bnVsbCwidHlwZSI6bnVsbCwiZGVzYyI6bnVsbCwiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbH0sImlhdCI6MTUwNjAwOTIwNX0.aWTfMa9hnf51hBq9jzv7niE3N-qxsGlOPaMdrbKOcYI'
    }
  })
    .get('/api/test')
    .reply(200, { foo: 'bar' });
  return expect(http.get('http://ocotpus.xyz/api/test')).resolves.toEqual({
    foo: 'bar'
  });
});

test('http get query', () => {
  nock('http://ocotpus.xyz')
    .get('/api/test?a=b&date=zero')
    .reply(200, { foo: 'bar' });
  return expect(http.get('http://ocotpus.xyz/api/test', { a: 'b', date: 'zero' })).resolves.toEqual(
    { foo: 'bar' }
  );
});

test('http post', () => {
  nock('http://ocotpus.xyz')
    .post('/api/test', { a: 'b' })
    .reply(200, { foo: 'bar' });
  return expect(http.post('http://ocotpus.xyz/api/test', null, { a: 'b' })).resolves.toEqual({
    foo: 'bar'
  });
});

test('http patch', () => {
  nock('http://ocotpus.xyz')
    .patch('/api/test', { a: 'b' })
    .reply(200, { foo: 'bar' });
  return expect(http.patch('http://ocotpus.xyz/api/test', null, { a: 'b' })).resolves.toEqual({
    foo: 'bar'
  });
});

test('http delete', () => {
  nock('http://ocotpus.xyz')
    .delete('/api/test', { a: 'b' })
    .reply(200, { foo: 'bar' });
  return expect(http.delete('http://ocotpus.xyz/api/test', null, { a: 'b' })).resolves.toEqual({
    foo: 'bar'
  });
});
