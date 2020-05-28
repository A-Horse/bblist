import React, { useMemo } from 'react';
import { getJWT } from '../utils/auth';
import { Claims } from '../typings/claims';

export function useClaims(): Claims | null {
  return useMemo(() => {
    const token = getJWT();
    if (!token) {
      return null;
    }
    try {
      const payloadBase64 = token.split('.')[1];
      return JSON.parse(atob(payloadBase64));
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);
}
