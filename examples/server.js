var Injector = require('../dist/injector.js').default;

class A {
    constructor() {
        this.nameA = "A";
    }
    get dependencies() {
        return [];
    }
}

class B {
    constructor(dependencies) {
        Object.assign(this, dependencies);
        this.nameB = "B";
    }
    get dependencies() {
        return ['a'];
    }
}

const injector = new Injector();
injector.register('a', A);
injector.register('b', B);
const b = injector.resolve("b");

console.log(b);