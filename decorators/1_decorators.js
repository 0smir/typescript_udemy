"use strict";
// In tsconfig.json file "experimentalDecorators" should be commented or setted gto false
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
function logger(target, ctx) {
    // ...args: any[] - mean ucan use as many arguments any types
    console.log('logger decorator');
    console.log(target);
    console.log(ctx);
    return class extends target {
        age = 33;
        constructor(...args) {
            super(...args);
            console.log('class constructor!');
            console.log('created: ', this);
        }
    };
}
// metod decorator for greet
function autobind(target, ctx) {
    // console.log('target: ', target);
    // console.log('ctx: ', ctx);
    ctx.addInitializer(function () {
        //In arguments should be normal function (not arrow), and this function should have as argument "this: any"
        this[ctx.name] = this[ctx.name].bind(this);
    });
    return function () {
        // in this case greet() will remove
        console.log('Executing of original function.'); // it can be any other code (http-requests etc.)
        // target() - this is original function, but not use it at the same time with addInitializer. 
        // Because target is original method without modifications, so it has no sence to change it and then call original 
        target.apply(this); // if you really need call original method - do it with binding 'this' - use apply.
    };
}
//================= factory ===========
function replacer(initVal) {
    // target: undefined - because decorator code will execute before field is done initializing
    return function replacerDecorator(target, ctx) {
        console.log('fieldLogger: ', target);
        console.log('fieldLogger', ctx);
        //you can change the field or to be precise that value
        return (initialValue) => {
            console.log(initialValue); // show initial value
            return initVal; // overighte initial value
        };
    };
}
let Personitem = (() => {
    let _classDecorators = [logger];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _greet_decorators;
    var Personitem = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [replacer('***')];
            _greet_decorators = [autobind];
            __esDecorate(this, null, _greet_decorators, { kind: "method", name: "greet", static: false, private: false, access: { has: obj => "greet" in obj, get: obj => obj.greet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Personitem = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // @fieldLogger
        name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, "Helga")); // field
        // constructor() { added to resolve greet(); error
        //   this.greet = this.greet.bind(this);
        // }
        greet() {
            console.log('hello, I am ' + this.name + '!');
        }
        constructor() {
            __runInitializers(this, _name_extraInitializers);
        }
    };
    return Personitem = _classThis;
})();
const helga = new Personitem();
helga.greet();
console.log(helga); // Personitem { name: 'Helga', age: 33 }
// original class was not removed, it was completed with age
const max = new Personitem();
const greet = max.greet;
max.greet(); // correct expressin even if we not use autobind-decorator
greet(); // return error if not use constructor or autobind-decorator in Personitem
