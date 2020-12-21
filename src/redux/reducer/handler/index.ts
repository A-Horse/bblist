import { normalize, Schema } from 'normalizr';
import get from 'lodash/get';

export class DataNormalize {
  private normalized: {
    entities: any;
    result: any;
  };
  constructor(private data: any, schema: Schema) {
    this.normalized = normalize(data, schema);
  }

  geEntities(define: string) {
    return get(this.normalized.entities, define);
    // return this.normalized.entities.Kanban;
  }
}
