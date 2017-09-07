import http from './http';
import nock from 'nock';

test('http get', () => {
  nock('http://ocotpus.xyz').get('/api/test').reply(200, { foo: 'bar' });
  return expect(http.get('http://ocotpus.xyz/api/test')).resolves.toEqual({ foo: 'bar' });
});

test('http get query', () => {
  nock('http://ocotpus.xyz').get('/api/test?a=b&date=zero').reply(200, { foo: 'bar' });
  return expect(
    http.get('http://ocotpus.xyz/api/test', { a: 'b', date: 'zero' })
  ).resolves.toEqual({ foo: 'bar' });
});
