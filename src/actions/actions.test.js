import Actions, { makeActionRequestCollection } from './actions';

test('Actions generated behavior', () => {
  expect(Actions.TEST_ONLY.REQUEST).toEqual('TEST_ONLY_REQUEST');
  expect(Actions.TEST_ONLY.SUCCESS).toEqual('TEST_ONLY_SUCCESS');
  expect(Actions.TEST_ONLY.FAILURE).toEqual('TEST_ONLY_FAILURE');

  expect(Actions.TEST_ONLY.request('payload')).toEqual({
    type: 'TEST_ONLY_REQUEST',
    payload: 'payload'
  });
  expect(Actions.TEST_ONLY.success('payload', { meta: 'meta' })).toEqual({
    type: 'TEST_ONLY_SUCCESS',
    payload: 'payload',
    meta: { meta: 'meta' }
  });
  expect(Actions.TEST_ONLY.failure('payload', { meta: 'meta' })).toEqual({
    type: 'TEST_ONLY_FAILURE',
    payload: 'payload',
    meta: { meta: 'meta' },
    error: true
  });
});

test('make action request collection', () => {
  const collection = makeActionRequestCollection([Actions.TEST_ONLY]);
  expect(collection).toEqual({
    TEST_ONLY_REQUEST: Actions.TEST_ONLY.request,
    TEST_ONLY_FINISH: Actions.TEST_ONLY.finish
  });
});
