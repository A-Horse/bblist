'use strict';

export class NotAuthError extends Error {
  constructor(message = 'Not Auth') {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class RequestError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

