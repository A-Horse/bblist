import { parseQueryParams } from './url.util';

test('parseQueryParams', () => {
  expect(parseQueryParams('/hello/world?foo=bar&name=moon')).toEqual({
    foo: 'bar',
    name: 'moon',
  });
});
