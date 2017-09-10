import http from './http';
import nock from 'nock';

test('http get', () => {
  nock('http://ocotpus.xyz').get('/api/test').reply(200, { foo: 'bar' });
  return expect(http.get('http://ocotpus.xyz/api/test')).resolves.toEqual({ foo: 'bar' });
});

test('http get jwt', () => {
  nock('http://ocotpus.xyz', {
    reqheaders: {
      'jwts-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoiYWJ5Y2hhbkBvdXRsb29rLmNvbSIsInN0YXR1cyI6bnVsbCwidHlwZSI6bnVsbCwiZGVzYyI6bnVsbCwiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbH0sImlhdCI6MTUwNDUzOTc0NX0.4e4suPkq_qtLywoRhvw43tHbP48RigtB1HrYN7D4HiY'
    }
  })
    .get('/api/test')
    .reply(200, { foo: 'bar' });
  return expect(http.get('http://ocotpus.xyz/api/test')).resolves.toEqual({ foo: 'bar' });
});

test('http get query', () => {
  nock('http://ocotpus.xyz').get('/api/test?a=b&date=zero').reply(200, { foo: 'bar' });
  return expect(
    http.get('http://ocotpus.xyz/api/test', { a: 'b', date: 'zero' })
  ).resolves.toEqual({ foo: 'bar' });
});

test('http post', () => {
  nock('http://ocotpus.xyz').post('/api/test', { a: 'b' }).reply(200, { foo: 'bar' });
  return expect(http.post('http://ocotpus.xyz/api/test', null, { a: 'b' })).resolves.toEqual({
    foo: 'bar'
  });
});

test('http patch', () => {
  nock('http://ocotpus.xyz').patch('/api/test', { a: 'b' }).reply(200, { foo: 'bar' });
  return expect(http.patch('http://ocotpus.xyz/api/test', null, { a: 'b' })).resolves.toEqual({
    foo: 'bar'
  });
});

test('http delete', () => {
  nock('http://ocotpus.xyz').delete('/api/test', { a: 'b' }).reply(200, { foo: 'bar' });
  return expect(http.delete('http://ocotpus.xyz/api/test', null, { a: 'b' })).resolves.toEqual({
    foo: 'bar'
  });
});
