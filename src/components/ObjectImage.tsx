import React from 'react';
import { objectFileUrl } from '../utils/object-storage';

export function ObjectImage(props: { uri: string; alt: string }) {
  const url = objectFileUrl(props.uri);
  if (!url) {
    return null;
  }
  return <img src={url} alt={props.alt} />;
}
