# [react-suspenser](https://github.com/JB1905/react-suspenser)

[![NPM version](https://img.shields.io/npm/v/react-suspenser?style=flat-square)](https://www.npmjs.com/package/react-suspenser)
[![NPM downloads](https://img.shields.io/npm/dm/react-suspenser?style=flat-square)](https://www.npmjs.com/package/react-suspenser)
[![NPM license](https://img.shields.io/npm/l/react-suspenser?style=flat-square)](https://www.npmjs.com/package/react-suspenser)
[![Codecov](https://img.shields.io/codecov/c/github/JB1905/react-suspenser?style=flat-square)](https://codecov.io/gh/JB1905/react-suspenser)
[![Travis](https://img.shields.io/travis/com/JB1905/react-suspenser/main?style=flat-square)](https://app.travis-ci.com/github/JB1905/react-suspenser)
[![Bundle size](https://img.shields.io/bundlephobia/min/react-suspenser?style=flat-square)](https://bundlephobia.com/result?p=react-suspenser)

## About

Easier management of the lazy loading process

## Demo

- [Basic](https://codesandbox.io/s/basic-demo-smd9i)
- [With Context](https://codesandbox.io/s/context-demo-9nvo0)

## How to Install

First, install the library in your project by npm:

```sh
$ npm install react-suspenser
```

Or Yarn:

```sh
$ yarn add react-suspenser
```

## Getting Started

### Without Context configuration

**• Use withSuspense:**

```js
// App.js

import React from 'react';
import { withSuspense } from 'react-suspenser';

const LazyComponent = withSuspense(<p>Loading...</p>)(
  lazy(() => import('./components/LazyComponent'))
);

const App = () => {
  return <LazyComponent />;
};

export default App;
```

---

### With Context configuration

**• Set SuspenseProvider (if you want to use the same fallback for all lazy components wrapped in withSuspense HOC):**

```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { SuspenseProvider } from 'react-suspenser';

import App from './App';

ReactDOM.render(
  <SuspenseProvider fallback={<p>Loading...</p>}>
    <App />
  </SuspenseProvider>,
  document.getElementById('root')
);
```

**• Then use withSuspense:**

```js
// App.js

import React from 'react';
import { withSuspense } from 'react-suspenser';

const LazyComponent = withSuspense()(
  lazy(() => import('./components/LazyComponent'))
);

const App = () => {
  return <LazyComponent />;
};

export default App;
```

## License

This project is licensed under the MIT License © 2020-present Jakub Biesiada
