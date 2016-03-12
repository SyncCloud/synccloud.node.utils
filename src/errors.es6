import _ from 'lodash';

Error.prototype.toJSON = function () {
  return {
    $type: 'Error',
    name: this.name,
    code: this.code,
    stack: this.stack,
    message: this.message,
    cause: this.cause,
    inner: this.inner
  };
};

export class ErrorBase extends Error {
  constructor(message, name) {
    super(message);
    Error.call(this, message);
    this.name = name || this.constructor.name;
    this.message = message;
  }
}

export class NotSupportedError extends ErrorBase {
  constructor() {
    super('Operation is not supported', 'NotSupportedError');
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AggregateError extends ErrorBase {
  constructor(inner) {
    super('Multiple errors have occured', 'AggregateError');
    Error.captureStackTrace(this, this.constructor);
    this.inner = inner || [];
  }
}

export class TimeoutError extends ErrorBase {
  constructor() {
    super('Operation timed out', 'TimeoutError');
    Error.captureStackTrace(this, this.constructor);
  }
}
