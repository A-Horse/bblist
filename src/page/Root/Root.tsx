let root: any;

if (process.env.NODE_ENV === 'production') {
  root = require('./Root.prod').default;
} else {
  root = require('./Root.dev').default;
}

export default root;
