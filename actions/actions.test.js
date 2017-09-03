import Actions from './actions';

describe('Actions', () => {
  it('Actions behavior', () => {
    expect(Actions.TEST_ONLY.REQUEST).toEqual('TEST_ONLY_REQUEST');
    expect(Actions.TEST_ONLY.SUCCESS).toEqual('TEST_ONLY_SUCCESS');
    expect(Actions.TEST_ONLY.FAILURE).toEqual('TEST_ONLY_FAILURE');

    expect(Actions.TEST_ONLY.request('playload')).toEqual({
      type: 'TEST_ONLY_REQUEST',
      playload: 'playload'
    });
    expect(Actions.TEST_ONLY.success('playload', { meta: 'meta' })).toEqual({
      type: 'TEST_ONLY_SUCCESS',
      playload: 'playload',
      meta: { meta: 'meta' }
    });
    expect(Actions.TEST_ONLY.failure('playload', { meta: 'meta' })).toEqual({
      type: 'TEST_ONLY_FAILURE',
      playload: 'playload',
      meta: { meta: 'meta' },
      error: true
    });
  });
});
