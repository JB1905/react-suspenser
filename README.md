# [react-suspenser](https://github.com/JB1905/react-suspenser)

[![NPM version](http://img.shields.io/npm/v/react-suspenser?style=flat-square)](https://www.npmjs.com/package/react-suspenser)
[![NPM downloads](http://img.shields.io/npm/dm/react-suspenser?style=flat-square)](https://www.npmjs.com/package/react-suspenser)
[![NPM license](https://img.shields.io/npm/l/react-suspenser?style=flat-square)](https://www.npmjs.com/package/react-suspenser)
[![Codecov](https://img.shields.io/codecov/c/github/JB1905/react-suspenser?style=flat-square)](https://codecov.io/gh/JB1905/react-suspenser)
[![Travis](https://img.shields.io/travis/JB1905/react-suspenser/master?style=flat-square)](https://travis-ci.org/JB1905/react-suspenser)
[![Bundle size](https://img.shields.io/bundlephobia/min/react-suspenser?style=flat-square)](https://bundlephobia.com/result?p=react-suspenser)

## About

Easier management of the lazy loading process

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

<!-- **• Import HOC in React application file:** -->

```js
import { SuspenseProvider, withSuspense } from 'react-suspenser';
```

#### Returned Values

#### Example

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

```js
// App.js

import React from 'react';
import { withSuspense } from 'react-suspenser';

const LazyComponent = lazy(() => import('./components/LazyComponent'));

const App = () => {
  return <LazyComponent />;
};

export default withSuspense(App);
```

//-------------------------------------------

```js
// App.js

import React from 'react';
import { withSuspense } from 'react-suspenser';

const LazyComponent = lazy(() => import('./components/LazyComponent'));

const App = () => {
  return <LazyComponent />;
};

export default withSuspense(App, <p>Loading...</p>);
```

## License

This project is licensed under the MIT License © 2020-present Jakub Biesiada
