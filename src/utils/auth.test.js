import { getJWT, saveJWT } from './auth';

test('getJWT', () => {
  expect(getJWT()).toEqual(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IumZs-aUvueCujJzZHNkITIyMjIyMjIyMjIyIiwiZW1haWwiOiJjaGVuZmFuZ3dlaUBvdXRsb29rLmNvbSIsInN0YXR1cyI6bnVsbCwidHlwZSI6bnVsbCwiZGVzYyI6bnVsbCwiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbH0sImlhdCI6MTUwNjAwOTIwNX0.aWTfMa9hnf51hBq9jzv7niE3N-qxsGlOPaMdrbKOcYI'
  );
});

test('saveJWT', () => {
  const originJWT = getJWT();
  saveJWT('jwt');
  expect(getJWT()).toEqual('jwt');
  saveJWT(originJWT);
});
