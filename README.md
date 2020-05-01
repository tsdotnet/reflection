# ![alt text](https://avatars1.githubusercontent.com/u/64487547?s=30&amp;v=4 "tsdotnet") tsdotnet / reflection

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/reflection/blob/master/LICENSE)
![npm-publish](https://github.com/tsdotnet/reflection/workflows/npm-publish/badge.svg)
[![npm version](https://img.shields.io/npm/v/@tsdotnet/reflection.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/reflection)

A set of classes and utilities for JavaScript type inspection and validation.

## `TypeValidator<T>`

### Benefits

- Allows for run-time validation and checking of dynamic types as well as integrated **type-guarding**.
- Super easy to use, basically only requires a copy paste.
- Works with literals!

### Usage

#### Step 1: Declare the expected type/interface.

```typescript
interface MyType
{
	a: object;
	b: string;
	c: number;
	d: boolean;
	e: {
		f: string;
		g: boolean;
		h: [
			number,
			boolean,
			string
		];
	};
}
```

#### Step 2: Copy the interface as an actual object and `<type>` the validator

The following can be done with pure JavaScript and still work.

```typescript
const myTypeValidator = new TypeValidator<MyType>(
{
	a: Object,
	b: String,
	c: Number,
	d: Boolean,
	e: {
		f: String,
		g: Boolean,
		h: [
			Number,
			Boolean,
			String
		]
	}
});
```

#### Step 3: validate as many times as you want:

```typescript
const myItem = {
	a: {},
	b: 'hello',
	c: 1,
	d: true,
	e: {
		f: 'whatever',
		g: false,
		h: [
			0,
			true,
			'2'
		]
	},
	i: 'noise'
};

// no compile-time type errors!
if (MyTypeValidator.isSubsetOf(myItem)) {
	console.log(myItem.e.h.length); // 3
    console.log(myItem.b); // "hello"
} else {
    throw new TypeError('Invalid type!');
}
```
