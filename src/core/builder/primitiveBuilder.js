"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveBuilder = void 0;
class PrimitiveBuilder {
    constructor(type) {
        this.node = { type: "primitive", primitive: type };
    }
    min(value) {
        if (this.node.primitive === 'string' || this.node.primitive === 'number') {
            this.addRule(this.node.primitive, { min: value });
        }
        else {
            this.addRule('min', { value });
        }
        return this;
    }
    max(value) {
        if (this.node.primitive === 'string' || this.node.primitive === 'number') {
            this.addRule(this.node.primitive, { max: value });
        }
        else {
            this.addRule('max', { value });
        }
        return this;
    }
    email() {
        this.addRule("email");
        return this;
    }
    optional() {
        this.node.optional = true;
        return this;
    }
    transform(name, params) {
        if (!this.node.transformers)
            this.node.transformers = [];
        this.node.transformers.push({ type: "transformer", name, params });
        return this;
    }
    rule(name, params) {
        this.addRule(name, params);
        return this;
    }
    addRule(name, params) {
        if (!this.node.rules)
            this.node.rules = [];
        this.node.rules.push({ type: "rule", name, params });
    }
    toAST() {
        return this.node;
    }
}
exports.PrimitiveBuilder = PrimitiveBuilder;
