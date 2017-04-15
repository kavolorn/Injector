import assert from "assert";
import {describe, it} from "mocha";

import Injector from "../dist/injector";

describe("Injector", () => {
    it("should provide specified dependencies (classes)", () => {
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
                return ["a"];
            }
        }

        const injector = new Injector(true);
        injector.register("a", A);
        injector.register("b", B);

        const b = injector.resolve("b");

        assert.deepStrictEqual(JSON.parse(JSON.stringify(b)), {
            a: {
                nameA: "A"
            },
            nameB: "B"
        });
    });
    it("should provide specified dependencies (prototypes)", () => {

        const A = function () {
            this.nameA = "A";
        };
        A.prototype.dependencies = [];

        const B = function (dependencies) {
            this.nameB = "B";
            Object.assign(this, dependencies);
        };
        B.prototype.dependencies = ["a"];

        const injector = new Injector(true);
        injector.register("a", A);
        injector.register("b", B);

        const b = injector.resolve("b");

        assert.deepStrictEqual(JSON.parse(JSON.stringify(b)), {
            a: {
                nameA: "A"
            },
            nameB: "B"
        });
    });
});