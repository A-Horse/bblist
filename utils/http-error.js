export class NotAuthError extends Error {
  constructor(message = 'Not Auth') {
    super(message);
    this.message = message;
    this.name = 'NotAuthError';
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'NotFoundError';
  }
}

export class RequestError extends Error {
  constructor(message = 'Request Error') {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class ServerError extends Error {
  constructor(message = 'Server Error') {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class UnprocessableError extends Error {
  constructor(message = 'Unprocessable Error') {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class UnKnownError extends Error {
  constructor(message = 'Unknown Error') {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Gateway timeout!') {
    super(message);
    this.message = message;
    this.name = 'TimeoutError';
  }
}
