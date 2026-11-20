<a name="banner"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/reflection@master/assets/banner.svg" alt="@tsdotnet/reflection: Ask a value what it is. Runtime type checks that narrow."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/reflection.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/reflection)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/reflection/blob/master/LICENSE)

Runtime type inspection with `typeInfo`, and `TypeValidator` for checking the shape of unknown values.

## Install

```sh
npm install @tsdotnet/reflection
```

## Usage

```ts
import { typeInfo } from '@tsdotnet/reflection';

typeInfo(42).isValidNumber;      // true
typeInfo('a').isString;          // true
typeInfo(null).isNullOrUndefined; // true
```

`TypeValidator<T>` (the default export) is built from a descriptor object; `isSubsetOf(value)` checks the value has at least those members and narrows it to `T`.

## Use it from

ESM (`import { typeInfo } from '@tsdotnet/reflection';`) or CommonJS (`const { typeInfo } = require('@tsdotnet/reflection');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/compare@1/dist/umd/compare.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/reflection@1/dist/umd/reflection.min.js"></script>
<script>
  const { typeInfo } = tsdotnet.reflection;
</script>
```

</details>

## Docs

[tsdotnet.github.io/reflection](https://tsdotnet.github.io/reflection/)
