/**
 * Simple dependency injector.
 * @constructor
 */
const Injector = function (disableOutput = false) {
    this.disableOutput = disableOutput;
    this.components = {
        injector: this,
    };
};

/**
 * Registers prepared component or constructor.
 * @param name Name of the component.
 * @param constructor Prepared component or constructor.
 */
Injector.prototype.register = function (name, constructor) {
    if (!this.disableOutput) {
        console.log(
            `[${new Date()}]`,
            `[Injector]`,
            `Registering '${name}' component.`,
        );
    }
    this.components[name] = constructor;
};

/**
 * Resolves component and registers it.
 * @param name Name of the service.
 * @param constructor Prepared component or constructor.
 * @param params Extra parameters for constructor.
 */
Injector.prototype.registerService = function (name, constructor, params) {
    const service = this.resolve(constructor, params);
    if (!this.disableOutput) {
        console.log(
            `[${new Date()}]`,
            `[Injector]`,
            `Registering '${name}' service.`,
        );
    }
    this.components[name] = service;
};
Injector.prototype.registerUtility = function (name, constructor, params) {
    const service = this.resolve(constructor, params);
    if (!this.disableOutput) {
        console.log(
            `[${new Date()}]`,
            `[Injector]`,
            `Registering '${name}' utility.`,
        );
    }
    this.components[name] = service;
};


/**
 * Resolves constructor into prepared component.
 * @param constructor Prepared component or constructor.
 * @returns {*}
 */
Injector.prototype.resolve = function (constructor, params) {
    // If constructor is an object returning it
    if (typeof constructor === "object") {
        return constructor;
    }
    // If constructor is an string returning registered component
    if (typeof constructor === "string") {
        if (this.components[constructor] === undefined) {
            throw `Cannot resolve '${constructor}' dependency.`;
        }
        return this.resolve(this.components[constructor]);
    }
    // If constructor is a function resolving it
    if (typeof constructor === "function") {
        if (!constructor.prototype.dependencies) {
            throw `Define dependencies for one of registered classes.`;
        }
        const dependencies = {};
        constructor.prototype.dependencies.forEach((dependency) => {
            if (this.components[dependency] === undefined) {
                throw `Cannot resolve '${dependency}' dependency.`;
            }
            dependencies[dependency] = this.resolve(this.components[dependency]);
        });
        return new constructor(dependencies, params);
    }
    throw `Cannot resolve dependency.`;
};

export default Injector;