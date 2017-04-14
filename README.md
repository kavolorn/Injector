# Injector

[![npm version](https://img.shields.io/npm/v/@alexey.kornilov/injector.svg?style=flat-square)](https://www.npmjs.com/package/@alexey.kornilov/injector)
[![license](https://img.shields.io/badge/licence-MIT-green.svg?style=flat-square)](https://github.com/kavolorn/Injector/blob/develop/LICENSE)

This is dependency injector for JavaScript with support for ES6/ES2015. It can 
be applied in both node and browser environments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
	- [Constructor Registration](#constructor-registration)
	- [Object Registration](#object-registration)
	- [Dependency Injection](#dependency-injection)

## Installation

Execute this command in your environment. 

```
npm install @alexey.kornilov/injector --save
```
or

```
yarn add @alexey.kornilov/injector
```

<small>[Table of Contents](#table-of-contents)</small>

## Usage

### Constructor Registration

One is able to register constructor for a particular class and create
instances of it:

```js
import Injector from "@alexey.kornilov/injector";

class Foo {
    constructor() {
        console.log("Creating instance of Foo.");
    }
    
    get dependencies() {
        return [];
    }
}

const injector = new Injector();
injector.register("foo", Foo);

// Resolve class by its registered name
const foo1 = injector.resolve("foo");

// Resolve class by its constructor reference
const foo2 = injector.resolve(Foo);
```

Expected output will be:

```
[Tue Mar 28 2017 08:39:53 GMT+0300 (MSK)] [Injector] Registering 'foo' component.
Creating instance of Foo.
Creating instance of Foo.
```

<small>[Table of Contents](#table-of-contents)</small>

### Object Registration

One is able to register pure object.

```js
import Injector from "@alexey.kornilov/injector";

const foo = {
    name: "Foo object " + Math.round(Math.random() * 10)
};

const injector = new Injector();
injector.register("foo", foo);

// Resolve registered object
const foo1 = injector.resolve("foo");
console.log(foo1);

// Resolve registered object
const foo2 = injector.resolve("foo");
console.log(foo2);

// We are expecting same object
console.log(foo1 === foo2 ? 
    "Same object resolved." : 
    "WARNING: unexpected resolved object.")
```

Expected output will be:

```
[Tue Mar 28 2017 08:46:31 GMT+0300 (MSK)] [Injector] Registering 'foo' component.
{ name: 'Foo object 5' }
{ name: 'Foo object 5' }
Same object resolved.

```

<small>[Table of Contents](#table-of-contents)</small>

### Dependency Injection

Now it's time to demonstrate dependency injection.

```js
import Injector from "@alexey.kornilov/injector";

class Foo {
    constructor() {
        console.log("Creating instance of Foo.");
    }
    
    get dependencies() {
        return [];
    }
}

class Bar {
    constructor(dependencies) {
        console.log("Creating instance of Bar.");
        Object.assign(this, dependencies);
    }
    
    get dependencies() {
        return [
            "foo"
        ];
    }
}

const injector = new Injector();
injector.register("foo", Foo);
injector.register("bar", Bar);

// Resolve class by its registered name
const bar1 = injector.resolve("bar");

// Bar contains injected foo
console.log(bar1);

// Resolve class by its constructor reference
const bar2 = injector.resolve(Bar);

// Bar contains injected foo
console.log(bar2);
```

Expected output will be:

```
[Wed Mar 29 2017 15:27:08 GMT+0300 (MSK)] [Injector] Registering 'foo' component.
[Wed Mar 29 2017 15:27:08 GMT+0300 (MSK)] [Injector] Registering 'bar' component.
Creating instance of Foo.
Creating instance of Bar.
Bar { foo: Foo {} }
Creating instance of Foo.
Creating instance of Bar.
Bar { foo: Foo {} }
```

Also usage examples can be found in `./examples` folder.

<small>[Table of Contents](#table-of-contents)</small>